import { PACKAGE_JSON } from "../../../src/domains/express/constants";
import { initPackageJson } from "../../../src/domains/express/lib/starter-factory/init-package-json";
import { ProjectMap } from "../../../src/domains/express/lib/starter-factory/project-factory";
import {
  getMockProjectMap,
  getMockRequestJs,
  getMockRequestTs,
} from "../../mockData";

describe("init-pacakge-json", () => {
  describe("ts", () => {
    test("scripts", async () => {
      const { projectMap } = await initPackageJson({
        projectMap: getMockProjectMap(),
        request: getMockRequestTs(),
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
        request: getMockRequestTs(),
      });
      const devDep = request.packageJson.devDependencies;

      expect(devDep.sort()).toEqual(
        ["typescript", "@types/node", "@types/express"].sort()
      );
    });

    test("Dependencies", async () => {
      const { request } = await initPackageJson({
        projectMap: getMockProjectMap(),
        request: getMockRequestTs(),
      });
      const dep = request.packageJson.dependencies;
      expect(dep.sort()).toEqual(["express"].sort());
    });

    describe("misc fields", () => {
      test("type", async () => {
        const { projectMap } = await initPackageJson({
          projectMap: getMockProjectMap(),
          request: getMockRequestTs(),
        });
        const packageJsonObj = getpackageJsonObject(projectMap);
        expect(packageJsonObj.type).toBe("commonjs");
      });
    });
  });

  describe("js", () => {
    describe("misc fields", () => {
      test("type", async () => {
        const { projectMap } = await initPackageJson({
          projectMap: getMockProjectMap(),
          request: getMockRequestTs(),
        });
        const packageJsonObj = getpackageJsonObject(projectMap);
        expect(packageJsonObj.type).toBe("commonjs");
      });
    });

    test("scripts", async () => {
      const { projectMap } = await initPackageJson({
        projectMap: getMockProjectMap(),
        request: getMockRequestJs(),
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
