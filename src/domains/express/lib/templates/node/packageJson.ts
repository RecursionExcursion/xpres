import { Template } from "../types";

export type ackageJsonTemplate = {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: { [key: string]: string };
  keywords: string[];
  author: string;
  license: "ISC";
  type: "commonjs" | "module";
  devDependencies: { [key: string]: string };
  dependencies: { [key: string]: string };
};

export const packageJsonTemplate = new Template({
  fileName: "package.json",
  content: {
    name: "",
    version: "1.0.",
    description: "",
    main: "index.js",
    scripts: {
      start: "",
      build: "",
      dev: "",
      test: "",
    },
    keywords: [],
    author: "",
    license: "ISC",
    type: "commonjs",
  },
});
