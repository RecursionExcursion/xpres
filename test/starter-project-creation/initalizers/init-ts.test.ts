import { TS_CONFIG } from "../../../src/domains/express/constants";
import { initTs } from "../../../src/domains/express/lib/starter-factory/init-ts";
import { getMockProjectMap, getMockRequest } from "../../mockData";

describe("init-ts Test", () => {
  describe("ts", () => {
    const mockReq = getMockRequest();
    mockReq.ts = {
      findTypeDependencies: true,
      useDefaultNpmPackage: true,
      config: {
        args: {},
      },
    };

    const { projectMap } = initTs({
      projectMap: getMockProjectMap(),
      request: mockReq,
    });

    test("ts config generation", () => {
      const tsConfig = projectMap.get(`/${TS_CONFIG}`);
      expect(!!tsConfig).toEqual(true);

      const obj = JSON.parse(tsConfig!);

      const options = obj.compilerOptions as Record<string, string>;

      expect(options.rootDir).toEqual("./");
      expect(options.outDir).toEqual("./dist");
      expect(options.target).toEqual("es2016");
      expect(options.module).toEqual("commonjs");
    });
  });

  describe("js", () => {
    const mockRequest = getMockRequest();
    mockRequest.ts = undefined;

    const { projectMap } = initTs({
      projectMap: getMockProjectMap(),
      request: mockRequest,
    });

    test("ts-config", () => {
      const tsConfig = projectMap.get(`/${TS_CONFIG}`);
      expect(tsConfig).toEqual(undefined);
    });
  });
});
