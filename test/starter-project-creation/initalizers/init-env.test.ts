import { ENV } from "../../../src/domains/express/constants";
import { initEnv } from "../../../src/domains/express/lib/starter-factory/init-env";
import { getMockProjectMap, getMockRequestTs } from "../../mockData";

describe("init-env Test", () => {
  test("env.use = true", () => {
    const mockRequest = getMockRequestTs();
    mockRequest.env.use = true;
    mockRequest.env.vars = { PORT: "8080" };
    const { projectMap } = initEnv({
      projectMap: getMockProjectMap(),
      request: mockRequest,
    });

    const gitIgnoreContents = projectMap.get(`/${ENV}`);

    expect(gitIgnoreContents).toBeDefined();
    expect(gitIgnoreContents?.includes("PORT = 8080"));
  });
  test("env.use = false", () => {
    const mockRequest = getMockRequestTs();
    mockRequest.env.use = false;
    const { projectMap } = initEnv({
      projectMap: getMockProjectMap(),
      request: mockRequest,
    });
    const gitIgnoreContents = projectMap.get(`/${ENV}`);
    expect(gitIgnoreContents).toBeUndefined();
  });
});
