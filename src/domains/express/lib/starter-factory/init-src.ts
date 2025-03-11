import { RequestDTO } from "../../requestDTO";
import { JS_FileWriter } from "../file-generators/js/js-file-writer";
import { ModuleImport } from "../file-generators/js/module-import";
import { ModuleExport } from "../file-generators/module-export";
import { PipeParams } from "./project-factory";

export function initSrc(params: PipeParams): PipeParams {
  const { request, projectMap } = params;

  const usingTs = request.ts.use;

  if (request.src.use) {
    const srcRoot = request.src.includeFolder ? "/src" : "/";
    const domainRouters: { path: string; name: string }[] = [];

    if (request.src.domains.length) {
      const domains = request.src.domains;

      domains.forEach((domain) => {
        const domainDir = `${srcRoot}/domains/${domain}`;

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

        const routerFile = createRouterFile({
          request,
          domain,
          fileName: routerFileName,
          routerName,
          controllerFileName: `./${
            usingTs ? controllerFileName : controllerFileNameWithExt
          }`,
          controllerName,
          usingTs,
        });

        const controllerFile = createControllerFile({
          request,
          domain,
          controllerFileName,
          controllerName,
          usingTs,
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
      "const PORT = process.env.PORT",
      "const app = Express();",
      `app.listen(PORT, () => console.log('App listening on PORT:' + PORT));`,
    ];

    //Inject routers
    if (domainRouters.length) {
      domainRouters.forEach((dr) => {
        indexScript.splice(2, 0, `app.use("/",${dr.name})`);
      });
    }

    const indexFile = createIndexFile({
      request,
      domainRouters,
      script: indexScript,
      usingTs,
    });

    projectMap.set(`/${srcRoot}/${indexFile.fileName}`, indexFile.generate());
  }

  return params;
}

function createIndexFile(params: {
  request: RequestDTO;
  domainRouters: {
    path: string;
    name: string;
  }[];
  script: string[];
  usingTs: boolean;
}) {
  const { request, domainRouters, script, usingTs } = params;
  return new JS_FileWriter({
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
    scriptLines: script,
    moduleType: request.packageJson.moduleType,
    ts: usingTs,
  });
}

function createRouterFile(params: {
  request: RequestDTO;
  domain: string;
  fileName: string;
  routerName: string;
  controllerName: string;
  controllerFileName: string;
  usingTs: boolean;
}) {
  const {
    request,
    domain,
    fileName,
    routerName,
    controllerName,
    controllerFileName,
    usingTs,
  } = params;

  const capitalizedDomainName = capitalizeFirstLetter(domain);

  return new JS_FileWriter({
    fileName: fileName,
    importStatements: [
      new ModuleImport({
        path: "express",
        destructured: ["Router"],
      }),
      new ModuleImport({
        //TODO This is not compataible atm with ts (will include file ext)
        path: controllerFileName,
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
}

function createControllerFile(params: {
  request: RequestDTO;
  domain: string;
  controllerFileName: string;
  controllerName: string;
  usingTs: boolean;
}) {
  const { request, domain, controllerFileName, controllerName, usingTs } =
    params;

  const capitalizedDomainName = capitalizeFirstLetter(domain);

  return new JS_FileWriter({
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
}

function capitalizeFirstLetter(word: string) {
  const lc = word.toLowerCase();
  return lc[0].toUpperCase() + lc.slice(1);
}
