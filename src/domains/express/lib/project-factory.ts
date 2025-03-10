import { pipe } from "../../../lib/pipe";
import { ENV, GIT_IGNORE, PACKAGE_JSON, TS_CONFIG } from "../constants";
import { RequestDTO } from "../requestDTO";
import { JS_FileWriter } from "./file-generators/js/js-file-writer";
import { ModuleImport } from "./file-generators/js/module-import";
import { ModuleExport } from "./file-generators/module-export";
import { EnvGenerator } from "./templates/EnvGenerator";
import { GitIgnoreGenerator } from "./templates/GitIgnoreGenerator";
import { PacakgeJsonGenerator } from "./templates/PackageJsonGenerator";
import { TsConfigGenerator } from "./templates/TsConfigGenerator";

type ProjectMap = Map<string, string>;
type PipeParams = { request: RequestDTO; projectMap: ProjectMap };

export function projectFactory(request: RequestDTO) {
  const projectMap = new Map<string, string>();

  pipe(
    initTs,
    initPackageJson,
    initSrc,
    initGitIgnore,
    initEnv
  )({ request, projectMap });

  return projectMap;
}

function initTs(params: PipeParams): PipeParams {
  const { request, projectMap } = params;
  if (request.ts.use) {
    if (request.ts.useDefaultNpmPackage) {
      request.packageJson.devDependencies.push("typescript");
    }

    if (request.ts.config.use) {
      const config = new TsConfigGenerator();
      projectMap.set(`/${TS_CONFIG}`, config.toJson());

      request.packageJson.scripts.start = `npm run ${config.outDir}/index.js`;
      request.packageJson.scripts.build = `tsc`;
      request.packageJson.scripts.dev = `npm run build && npm run start`;
    }
  }

  if (request.ts.findTypeDependencies) {
    request.packageJson.devDependencies.push("@types/express");
    request.packageJson.devDependencies.push("@types/node");
  }

  return params;
}

function initPackageJson(params: PipeParams): PipeParams {
  const { request, projectMap } = params;
  const pkgJsn = new PacakgeJsonGenerator({
    dependencies: request.packageJson.dependencies,
    devDependencies: request.packageJson.devDependencies,
    scripts: request.packageJson.scripts,
  });

  projectMap.set(`/${PACKAGE_JSON}`, pkgJsn.toJson());

  return params;
}

function initSrc(params: PipeParams): PipeParams {
  const { request, projectMap } = params;

  const usingTs = request.ts.use;

  if (request.src.use) {
    const srcRoot = request.src.includeFolder ? "/src" : "/";
    const domainRouters: { path: string; name: string }[] = [];

    if (request.src.domains.length) {
      const domains = request.src.domains;

      domains.forEach((domain) => {
        const domainDir = `${srcRoot}/domains/${domain}`;

        const lc = domain.toLowerCase();
        const capitalizedDomainName = lc[0].toUpperCase() + lc.slice(1);

        function resolveFileExt() {
          return request.ts.use ? ".ts" : ".js";
        }

        //TODO Add logic to resovle ts vs js (file ext included)
        const routerFileName = `${domain}-router`;
        const routerFileNameWithExt = routerFileName + resolveFileExt();

        const controllerFileName = `${domain}-controller`;
        const controllerFileNameWithExt = controllerFileName + resolveFileExt();

        const controllerName = `${domain}Controller`;
        const routerName = `${domain}Router`;

        const routerFile = new JS_FileWriter({
          fileName: routerFileName,
          importStatements: [
            new ModuleImport({
              path: "express",
              destructured: ["Router"],
            }),
            new ModuleImport({
              //TODO This is not compataible atm with ts (will include file ext)
              path: `./${
                usingTs ? controllerFileName : controllerFileNameWithExt
              }`,
              destructured: [controllerName],
            }),
          ],
          scriptLines: [
            `const ${routerName} = Router();`,
            `const path = "/${domain}"`,
            `${routerName}.post(path, ${controllerName}.create${capitalizedDomainName})`,
            `${routerName}.get(path, ${controllerName}.get${capitalizedDomainName})`,
            `${routerName}.put(path, ${controllerName}.update${capitalizedDomainName})`,
            `${routerName}.delete(path, ${controllerName}.delete${capitalizedDomainName})`,
          ],
          moduleType: request.packageJson.moduleType,
          exportStatements: new ModuleExport(
            request.packageJson.moduleType,
            "destructured",
            [routerName]
          ),
          ts: usingTs,
        });

        const controllerFile = new JS_FileWriter({
          fileName: controllerFileName,
          importStatements: [],
          scriptLines: [
            `const ${controllerName} = {
                    create${capitalizedDomainName}(){},
                    
                    get${capitalizedDomainName}(){},
                    
                    update${capitalizedDomainName}(){},
                    
                    delete${capitalizedDomainName}(){}
                    }`,
          ],
          moduleType: request.packageJson.moduleType,
          exportStatements: new ModuleExport(
            request.packageJson.moduleType,
            "destructured",
            [controllerName]
          ),
          ts: usingTs,
        });

        projectMap.set(
          `${domainDir}/${routerFileNameWithExt}`,
          routerFile.generate()
        );

        projectMap.set(
          `${domainDir}/${controllerFileNameWithExt}`,
          controllerFile.generate()
        );

        domainRouters.push({
          path: `./domains/${domain.toLowerCase()}/${
            usingTs ? routerFileName : routerFileNameWithExt
          }`,
          name: routerName,
        });
      });
    }

    const indexScript = [
      "const app = Express();",
      `app.listen(8080, () => console.log('App listening on PORT ' + 8080));`,
    ];

    //Inject routers
    if (domainRouters.length) {
      domainRouters.forEach((dr) => {
        indexScript.splice(1, 0, `app.use("/",${dr.name})`);
      });
    }

    const indexFile = new JS_FileWriter({
      fileName: request.ts.use ? "index.ts" : "index.js",
      importStatements: [
        new ModuleImport({
          path: "express",
          default: "Express",
        }),
        //import routers
        ...domainRouters.map((dr) => {
          return new ModuleImport({
            path: dr.path,
            destructured: [dr.name],
          });
        }),
      ],
      scriptLines: indexScript,
      moduleType: request.packageJson.moduleType,
      ts: usingTs,
    });

    projectMap.set(`/${srcRoot}/${indexFile.fileName}`, indexFile.generate());
  }

  return params;
}

function initGitIgnore(params: PipeParams): PipeParams {
  const { request, projectMap } = params;
  if (request.git.ignore) {
    projectMap.set(
      `/${GIT_IGNORE}`,
      new GitIgnoreGenerator(request.git.toIgnore).toText()
    );
  }

  return params;
}

function initEnv(params: PipeParams): PipeParams {
  const { request, projectMap } = params;

  if (request.env.use) {
    projectMap.set(`/${ENV}`, new EnvGenerator(request.env.vars).toText());
  }

  return params;
}
