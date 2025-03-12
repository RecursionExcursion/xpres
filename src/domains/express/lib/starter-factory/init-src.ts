import { ProjectRequestDTO } from "../../project-request-dto";
import { generateJsFile } from "../file-generators/js/js-file-writer";
import { ModuleExport } from "../file-generators/js/module-export";
import { createModuleImport } from "../file-generators/js/module-import";
import { PipeParams } from "./project-factory";

export function initSrc(params: PipeParams): PipeParams {
  const { request, projectMap } = params;

  const usingTs = request.ts !== undefined;

  if (request.src) {
    const srcRoot = request.src.includeFolder ? "./src" : ".";
    const domainRouters: { path: string; name: string }[] = [];

    if (request.src.domains.length) {
      const domains = request.src.domains;

      domains.forEach((domain) => {
        const domainDir = `${srcRoot}/domains/${domain}`;

        const resolveFileExt = () => (usingTs ? ".ts" : ".js");

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

        projectMap.set(`${domainDir}/${routerFileNameWithExt}`, routerFile);

        projectMap.set(
          `${domainDir}/${controllerFileNameWithExt}`,
          controllerFile
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
      "app.listen(PORT, () => console.log('App listening on PORT:' + PORT));",
    ];

    //Inject routers
    if (domainRouters.length) {
      domainRouters.forEach((dr) => {
        indexScript.splice(2, 0, `app.use("/",${dr.name})`);
      });
    }

    const { fileName: indexFileName, content: indexFileContent } =
      createIndexFile({
        request,
        domainRouters,
        script: indexScript,
        usingTs,
      });

    projectMap.set(`${srcRoot}/${indexFileName}`, indexFileContent);
  }

  return params;
}

function createIndexFile(params: {
  request: ProjectRequestDTO;
  domainRouters: {
    path: string;
    name: string;
  }[];
  script: string[];
  usingTs: boolean;
}) {
  const { request, domainRouters, script, usingTs } = params;

  const fileName = usingTs ? "index.ts" : "index.js";

  const content = generateJsFile({
    fileName,
    importGenerators: [
      createModuleImport({
        path: "express",
        defaultImport: "Express",
      }),
      //import routers
      ...domainRouters.map((dr) => {
        return createModuleImport({
          path: dr.path,
          destructuredImports: [dr.name],
        });
      }),
    ],
    scriptLines: script,
    moduleType: request.packageJson.moduleType,
    ts: usingTs,
  });

  return { fileName, content };
}

function createRouterFile(params: {
  request: ProjectRequestDTO;
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

  return generateJsFile({
    fileName: fileName,
    importGenerators: [
      createModuleImport({
        path: "express",
        destructuredImports: ["Router"],
      }),
      createModuleImport({
        //TODO This is not compataible atm with ts (will include file ext)
        path: controllerFileName,
        destructuredImports: [controllerName],
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
  request: ProjectRequestDTO;
  domain: string;
  controllerFileName: string;
  controllerName: string;
  usingTs: boolean;
}) {
  const { request, domain, controllerFileName, controllerName, usingTs } =
    params;

  const capitalizedDomainName = capitalizeFirstLetter(domain);

  return generateJsFile({
    fileName: controllerFileName,
    importGenerators: [],
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
