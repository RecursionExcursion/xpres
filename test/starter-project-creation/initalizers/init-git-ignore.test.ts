import { GIT_IGNORE } from "../../../src/domains/express/constants";
import { initGitIgnore } from "../../../src/domains/express/lib/starter-factory/init-git-ignore";
import { getMockProjectMap, getMockRequestTs } from "../../mockData";

describe("init-git-ignore", () => {
  test("gitgnore = true", () => {
    const { projectMap } = initGitIgnore({
      projectMap: getMockProjectMap(),
      request: getMockRequestTs(),
    });

    const gitIgnoreContents = projectMap.get(`/${GIT_IGNORE}`);
    expect(gitIgnoreContents).toBeDefined();

    expect(
      gitIgnoreContents?.includes(".env") && gitIgnoreContents.includes("/dist")
    ).toBe(true);
  });
  test("gitgnore = true", () => {
    const mockRequest = getMockRequestTs();
    mockRequest.git.ignore = false;

    const { projectMap } = initGitIgnore({
      projectMap: getMockProjectMap(),
      request: mockRequest,
    });

    const gitIgnoreContents = projectMap.get(`/${GIT_IGNORE}`);
    expect(gitIgnoreContents).toBeUndefined();
  });
});
