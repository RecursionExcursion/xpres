import { ENV } from "../../constants";
import { generateEnvFile } from "../templates/generators/env-generator";

import { PipeParams } from "./project-factory";

export function initEnv(params: PipeParams): PipeParams {
  const { request, projectMap } = params;

  if (request.env.use) {
    projectMap.set(`/${ENV}`, generateEnvFile(request.env.vars));
  }

  return params;
}
