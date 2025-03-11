import { asyncPipe, pipe } from "../../../../lib/pipe";
import { ProjectRequestDTO } from "../../project-request-dto";
import { initEnv } from "./init-env";
import { initGitIgnore } from "./init-git-ignore";
import { initPackageJson } from "./init-package-json";
import { initSrc } from "./init-src";
import { initTs } from "./init-ts";

export type ProjectMap = Map<string, string>;
export type PipeParams = { request: ProjectRequestDTO; projectMap: ProjectMap };

export async function projectFactory(request: ProjectRequestDTO) {
  const projectMap = new Map<string, string>();

  await asyncPipe(
    initTs,
    initPackageJson,
    initSrc,
    initGitIgnore,
    initEnv
  )({ request, projectMap });

  return projectMap;
}
