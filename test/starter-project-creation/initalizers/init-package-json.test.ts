import {
  npmPackageGroups,
  PACKAGE_JSON,
} from "../../../src/domains/express/constants";
import { initPackageJson } from "../../../src/domains/express/lib/starter-factory/init-package-json";
import { ProjectMap } from "../../../src/domains/express/lib/starter-factory/project-factory";
import { getMockProjectMap, getMockRequest } from "../../mockData";

describe("init-package-json", () => {
  describe("ts", () => {
    const mockRequest = getMockRequest();
    mockRequest.env = {
      vars: {},
    };
    mockRequest.ts = {
      findTypeDependencies: true,
      useDefaultNpmPackage: true,
      config: { args: {} },
    };

    test("scripts", async () => {
      const { projectMap } = await initPackageJson({
        projectMap: getMockProjectMap(),
        request: mockRequest,
      });

      const packageJsonObj = getpackageJsonObject(projectMap);

      expect(packageJsonObj.scripts).toStrictEqual({
        start: "node --env-file=.env /dist/index.js",
        build: "tsc",
        dev: "npm run build && npm run start",
        test: "",
      });
    });

    test("Dev Dependencies", async () => {
      const { request } = await initPackageJson({
        projectMap: getMockProjectMap(),
        request: getMockRequest(),
      });
      const devDep = request.packageJson.devDependencies;

      expect(devDep.sort()).toEqual(
        [
          ...npmPackageGroups.typescript.devDependency,
          ...npmPackageGroups.node.typeDependency,
          ...npmPackageGroups.express.typeDependency,
        ].sort()
      );
    });

    test("Dependencies", async () => {
      const { request } = await initPackageJson({
        projectMap: getMockProjectMap(),
        request: getMockRequest(),
      });

      const dep = request.packageJson.dependencies;
      expect(dep.sort()).toEqual(
        [...npmPackageGroups.express.dependency].sort()
      );
    });

    describe("misc fields", () => {
      test("type", async () => {
        const { projectMap } = await initPackageJson({
          projectMap: getMockProjectMap(),
          request: getMockRequest(),
        });

        const packageJsonObj = getpackageJsonObject(projectMap);
        expect(packageJsonObj.type).toBe("commonjs");
      });
    });
  });

  describe("js", () => {
    describe("misc fields", () => {
      test("type", async () => {
        const mockRequest = getMockRequest();
        mockRequest.env = {
          vars: {},
        };

        const { projectMap } = await initPackageJson({
          projectMap: getMockProjectMap(),
          request: mockRequest,
        });
        const packageJsonObj = getpackageJsonObject(projectMap);
        expect(packageJsonObj.type).toBe("commonjs");
      });
    });

    test("scripts", async () => {
      const mockRequest = getMockRequest();
      mockRequest.env = {
        vars: {},
      };

      const { projectMap } = await initPackageJson({
        projectMap: getMockProjectMap(),
        request: mockRequest,
      });

      const packageJsonObj = getpackageJsonObject(projectMap);

      expect(packageJsonObj.scripts).toStrictEqual({
        start: "node --env-file=.env index.js",
        build: "",
        dev: "",
        test: "",
      });
    });
  });
});

function getpackageJsonObject(projectMap: ProjectMap) {
  const packageJsonContent = projectMap.get(`/${PACKAGE_JSON}`);
  expect(packageJsonContent).toBeDefined();
  return JSON.parse(packageJsonContent!) as Record<string, unknown>;
}
