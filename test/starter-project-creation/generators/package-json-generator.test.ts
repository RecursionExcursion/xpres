import { generatePackageJson } from "../../../src/domains/express/lib/templates/generators/package-json-generator";

describe("generatePackageJson Test", () => {
  test("type test", async () => {
    const packageJsonContent = await generatePackageJson({
      type: "module",
    });
    expect(JSON.parse(packageJsonContent).type).toBe("module");
  });
});
