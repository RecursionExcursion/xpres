import { Template } from "../types";

export const gitignoreTemplate = new Template({
  fileName: ".gitignore",
  content: {
    0: "node_modules",
  },
});
