import { TS_CONFIG } from "../../constants";
import { generateTsConfig } from "../templates/generators/ts-config-generator";

import { PipeParams } from "./project-factory";

export function initTs(params: PipeParams): PipeParams {
  const { request, projectMap } = params;
  if (request.ts) {
    // if (request.ts.useDefaultNpmPackage) {
    //   request.packageJson.devDependencies.push("typescript");
    // }

    if (request.ts.config) {
      const config = generateTsConfig();
      projectMap.set(`/${TS_CONFIG}`, config.fileContent);

      //set up scripts for ts
      // if (!request.packageJson.scripts.start) {
      //   request.packageJson.scripts.start = `node ${config.outDir}/index.js`;
      // }
      // if (!request.packageJson.scripts.build) {
      //   request.packageJson.scripts.build = `tsc`;
      // }
      // if (!request.packageJson.scripts.dev) {
      //   request.packageJson.scripts.dev = `npm run build && npm run start`;
      // }
    }

    // if (request.ts.findTypeDependencies) {
    //   //TODO Expand, use npm to find these based on the dep
    //   request.packageJson.devDependencies.push("@types/express");
    //   request.packageJson.devDependencies.push("@types/node");
    // }
  }
  return params;
}
