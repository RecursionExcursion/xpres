import { asyncPipe, pipe } from "../../../../lib/pipe";
import { RequestDTO } from "../../requestDTO";
import { initEnv } from "./init-env";
import { initGitIgnore } from "./init-git-ignore";
import { initPackageJson } from "./init-package-json";
import { initSrc } from "./init-src";
import { initTs } from "./init-ts";

export type ProjectMap = Map<string, string>;
export type PipeParams = { request: RequestDTO; projectMap: ProjectMap };

export async function projectFactory(request: RequestDTO) {
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
