import { initSrc } from "../../../src/domains/express/lib/starter-factory/init-src";
import {
  getMockProjectMap,
  getMockRequestJs,
  getMockRequestTs,
} from "../../mockData";

describe("init-src Test", () => {
  describe("ts", () => {
    const { projectMap } = initSrc({
      projectMap: getMockProjectMap(),
      request: getMockRequestTs(),
    });

    test("index file", () => {
      const indexFileContent = projectMap.get("./src/index.ts");
      expect(indexFileContent).toBeDefined();
      expect(indexFileContent).toBe(
        'import Express from "express";\n' +
          'import { fooRouter } from "./domains/foo/foo-router";\n' +
          'import { barRouter } from "./domains/bar/bar-router";\n' +
          "\n" +
          "const PORT = process.env.PORT\n" +
          "const app = Express();\n" +
          'app.use("/",barRouter)\n' +
          'app.use("/",fooRouter)\n' +
          "app.listen(PORT, () => console.log('App listening on PORT:' + PORT));\n"
      );
    });

    test("router files", () => {
      const fooRouterFile = projectMap.get("./src/domains/foo/foo-router.ts");
      const barRouterFile = projectMap.get("./src/domains/bar/bar-router.ts");

      expect(fooRouterFile).toBeDefined();
      expect(barRouterFile).toBeDefined();

      expect(fooRouterFile).toBe(
        'import { Router } from "express";\n' +
          'import { fooController } from "./foo-controller";\n' +
          "\n" +
          "const fooRouter = Router();\n" +
          'const path = "/foo"\n' +
          "fooRouter.post(path, fooController.createFoo)\n" +
          "fooRouter.get(path, fooController.getFoo)\n" +
          "fooRouter.put(path, fooController.updateFoo)\n" +
          "fooRouter.delete(path, fooController.deleteFoo)\n" +
          "\n" +
          "export { fooRouter }"
      );

      expect(barRouterFile).toBe(
        'import { Router } from "express";\n' +
          'import { barController } from "./bar-controller";\n' +
          "\n" +
          "const barRouter = Router();\n" +
          'const path = "/bar"\n' +
          "barRouter.post(path, barController.createBar)\n" +
          "barRouter.get(path, barController.getBar)\n" +
          "barRouter.put(path, barController.updateBar)\n" +
          "barRouter.delete(path, barController.deleteBar)\n" +
          "\n" +
          "export { barRouter }"
      );
    });

    test("controller files", () => {
      const fooControllerFile = projectMap.get(
        "./src/domains/foo/foo-controller.ts"
      );
      const barControllerFile = projectMap.get(
        "./src/domains/bar/bar-controller.ts"
      );

      expect(fooControllerFile).toBeDefined();
      expect(barControllerFile).toBeDefined();

      expect(fooControllerFile).toBe(
        "const fooController = {\n" +
          "        createFoo(){},\n" +
          "        getFoo(){},\n" +
          "        updateFoo(){},\n" +
          "        deleteFoo(){}\n" +
          "        }\n" +
          "\n" +
          "export { fooController }"
      );

      expect(barControllerFile).toBe(
        "const barController = {\n" +
          "        createBar(){},\n" +
          "        getBar(){},\n" +
          "        updateBar(){},\n" +
          "        deleteBar(){}\n" +
          "        }\n" +
          "\n" +
          "export { barController }"
      );
    });
  });

  describe("js", () => {
    const { projectMap } = initSrc({
      projectMap: getMockProjectMap(),
      request: getMockRequestJs(),
    });

    test("index file", () => {
      const indexFileContent = projectMap.get("./src/index.js");
      expect(indexFileContent).toBeDefined();
      expect(indexFileContent).toBe(
        'const Express = require("express");\n' +
          'const { fooRouter } = require("./domains/foo/foo-router.js");\n' +
          'const { barRouter } = require("./domains/bar/bar-router.js");\n' +
          "\n" +
          "const PORT = process.env.PORT\n" +
          "const app = Express();\n" +
          'app.use("/",barRouter)\n' +
          'app.use("/",fooRouter)\n' +
          "app.listen(PORT, () => console.log('App listening on PORT:' + PORT));\n"
      );
    });

    test("router files", () => {
      const fooRouterFile = projectMap.get("./src/domains/foo/foo-router.js");
      const barRouterFile = projectMap.get("./src/domains/bar/bar-router.js");

      expect(fooRouterFile).toBeDefined();
      expect(barRouterFile).toBeDefined();

      expect(fooRouterFile).toBe(
        'const { Router } = require("express");\n' +
          'const { fooController } = require("./foo-controller.js");\n' +
          "\n" +
          "const fooRouter = Router();\n" +
          'const path = "/foo"\n' +
          "fooRouter.post(path, fooController.createFoo)\n" +
          "fooRouter.get(path, fooController.getFoo)\n" +
          "fooRouter.put(path, fooController.updateFoo)\n" +
          "fooRouter.delete(path, fooController.deleteFoo)\n" +
          "\n" +
          "module.exports = { fooRouter }"
      );

      expect(barRouterFile).toBe(
        'const { Router } = require("express");\n' +
          'const { barController } = require("./bar-controller.js");\n' +
          "\n" +
          "const barRouter = Router();\n" +
          'const path = "/bar"\n' +
          "barRouter.post(path, barController.createBar)\n" +
          "barRouter.get(path, barController.getBar)\n" +
          "barRouter.put(path, barController.updateBar)\n" +
          "barRouter.delete(path, barController.deleteBar)\n" +
          "\n" +
          "module.exports = { barRouter }"
      );
    });

    test("controller files", () => {
      const fooControllerFile = projectMap.get(
        "./src/domains/foo/foo-controller.js"
      );
      const barControllerFile = projectMap.get(
        "./src/domains/bar/bar-controller.js"
      );

      expect(fooControllerFile).toBeDefined();
      expect(barControllerFile).toBeDefined();

      expect(fooControllerFile).toBe(
        "const fooController = {\n" +
          "        createFoo(){},\n" +
          "        getFoo(){},\n" +
          "        updateFoo(){},\n" +
          "        deleteFoo(){}\n" +
          "        }\n" +
          "\n" +
          "module.exports = { fooController }"
      );

      expect(barControllerFile).toBe(
        "const barController = {\n" +
          "        createBar(){},\n" +
          "        getBar(){},\n" +
          "        updateBar(){},\n" +
          "        deleteBar(){}\n" +
          "        }\n" +
          "\n" +
          "module.exports = { barController }"
      );
    });
  });

  describe("js no src folder", () => {
    const mockRequest = getMockRequestJs();
    mockRequest.src.includeFolder = false;

    const { projectMap } = initSrc({
      projectMap: getMockProjectMap(),
      request: mockRequest,
    });

    test("index.js path", () => {
      const indexFileWithSrcFolder = projectMap.get("/src/index.js");
      const indexFileNoSrcFolder = projectMap.get("./index.js");

      expect(indexFileWithSrcFolder).toBeUndefined();
      expect(indexFileNoSrcFolder).toBeDefined();
    });
  });
});
