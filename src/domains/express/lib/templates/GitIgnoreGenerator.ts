import { Template } from "./types";

export const gitignoreTemplate = new Template({
  fileName: ".gitignore",
  content: {
    0: "node_modules",
  },
});

export class GitIgnoreGenerator {
  base = ["node_modules"];

  constructor(args?: string[]) {
    if (args) {
      this.base.push(...args);
    }
  }

  toText() {
    return this.base.join("\n");
  }
}
