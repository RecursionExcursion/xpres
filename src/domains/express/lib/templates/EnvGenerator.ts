import { Template } from "./types";

export const envTemplate = new Template({
  fileName: ".env",
  content: {},
});
export class EnvGenerator {
  base: string[] = [];

  constructor(envVars: { [key: string]: string } = {}) {
    this.base = Object.entries(envVars).map(
      (envVar) => `${envVar[0]} = ${envVar[1]}`
    );
  }

  toText() {
    return this.base.join("\n");
  }
}
