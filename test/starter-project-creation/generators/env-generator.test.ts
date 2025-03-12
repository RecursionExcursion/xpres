import { generateEnvFile } from "../../../src/domains/express/lib/templates/generators/env-generator";

describe("env-generator Test", () => {
  test("Env var mapping", () => {
    const envString = generateEnvFile({
      PORT: "8080",
      KEY: "1234",
    });

    const includesVars =
      envString.includes("PORT = 8080") && envString.includes("KEY = 1234");
      
    expect(includesVars).toBe(true);
  });
  test("Env var mapping (no vars)", () => {
    const envString = generateEnvFile();
    expect(envString).toBe("");
  });
});
