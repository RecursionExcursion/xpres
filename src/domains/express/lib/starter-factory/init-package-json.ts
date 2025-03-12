import { PACKAGE_JSON } from "../../constants";
import { ProjectRequestDTO } from "../../project-request-dto";
import { generatePackageJson } from "../templates/generators/package-json-generator";
import { PipeParams } from "./project-factory";

export async function initPackageJson(params: PipeParams): Promise<PipeParams> {
  const { request, projectMap } = params;

  setScripts(request);

  projectMap.set(
    `/${PACKAGE_JSON}`,
    await generatePackageJson({
      dependencies: request.packageJson.dependencies,
      devDependencies: request.packageJson.devDependencies,
      scripts: request.packageJson.scripts,
    })
  );

  return params;
}

function setScripts(request: ProjectRequestDTO) {
  if (!request.packageJson.scripts.start) {
    let startScriptTemplate = "node <env-config> <target-file>";

    startScriptTemplate = startScriptTemplate.replace(
      "<env-config>",
      request.env ? "--env-file=.env" : ""
    );

    if (request.ts) {
      if (request.ts.config) {
        startScriptTemplate = startScriptTemplate.replace(
          "<target-file>",
          request.ts.config.args["outDir"] ?? "/dist/index.js"
        );
      }
    } else {
      startScriptTemplate = startScriptTemplate.replace(
        "<target-file>",
        "index.js"
      );
    }

    request.packageJson.scripts.start = startScriptTemplate;
  }
  
  if (request.ts) {
    if (!request.packageJson.scripts.build) {
      request.packageJson.scripts.build = `tsc`;
    }
    if (!request.packageJson.scripts.dev) {
      request.packageJson.scripts.dev = `npm run build && npm run start`;
    }
  }
}
