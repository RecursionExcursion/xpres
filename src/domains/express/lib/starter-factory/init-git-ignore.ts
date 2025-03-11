import { GIT_IGNORE } from "../../constants";
import { generateGitIgnore } from "../templates/generators/git-ignore-generator";
import { PipeParams } from "./project-factory";

export function initGitIgnore(params: PipeParams): PipeParams {
  const { request, projectMap } = params;
  if (request.git.ignore) {
    projectMap.set(`/${GIT_IGNORE}`, generateGitIgnore(request.git.toIgnore));
  }

  return params;
}
