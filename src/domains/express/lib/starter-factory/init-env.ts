import { ENV } from "../../constants";
import { EnvGenerator } from "../templates/EnvGenerator";
import { PipeParams } from "./project-factory";

export function initEnv(params: PipeParams): PipeParams {
  const { request, projectMap } = params;

  if (request.env.use) {
    projectMap.set(`/${ENV}`, new EnvGenerator(request.env.vars).toText());
  }

  return params;
}
