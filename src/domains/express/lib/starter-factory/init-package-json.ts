import { PACKAGE_JSON } from "../../constants";
import { RequestDTO } from "../../requestDTO";
import { generatePackageJson } from "../templates/package-json-generator";
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

function setScripts(request: RequestDTO) {
  if (!request.packageJson.scripts["start"]) {
    let startScriptTemplate = "node <env-config> <target-file>";

    startScriptTemplate = startScriptTemplate.replace(
      "<env-config>",
      request.env.use ? "--env-file=.env" : ""
    );

    if (request.ts.use) {
      if (request.ts.config.use) {
        startScriptTemplate = startScriptTemplate.replace(
          "<target-file>",
          request.ts.config.args["outDir"] ?? "/dist/index.ts"
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
}
