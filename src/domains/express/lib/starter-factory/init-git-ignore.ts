import { GIT_IGNORE } from "../../constants";
import { GitIgnoreGenerator } from "../templates/GitIgnoreGenerator";
import { PipeParams } from "./project-factory";

export function initGitIgnore(params: PipeParams): PipeParams {
  const { request, projectMap } = params;
  if (request.git.ignore) {
    projectMap.set(
      `/${GIT_IGNORE}`,
      new GitIgnoreGenerator(request.git.toIgnore).toText()
    );
  }

  return params;
}
