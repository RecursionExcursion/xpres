import { generateTsConfig } from "../../../src/domains/express/lib/templates/generators/ts-config-generator";

describe("generateTsConfig Test", () => {
  const tsConfig = generateTsConfig({
    foo: "bar",
  });

  test("file content", () => {
    const content = JSON.parse(tsConfig.fileContent);

    const options = content.compilerOptions as Record<string, string>;

    expect(options.rootDir).toEqual("./");
    expect(options.outDir).toEqual("./dist");
    expect(options.target).toEqual("es2016");
    expect(options.module).toEqual("commonjs");
  });

  test("outDir()", () => {
    expect(tsConfig.outDir()).toEqual("./dist");
  });

  test("rootDir()", () => {
    expect(tsConfig.rootDir()).toEqual("./");
  });

  test("Optional Args", () => {
    const content = JSON.parse(tsConfig.fileContent);
    const options = content.compilerOptions as Record<string, string>;
    expect(options.foo).toEqual("bar");
  });
});
