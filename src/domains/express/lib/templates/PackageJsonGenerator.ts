type PackageJsonTemplate = {
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

export class PacakgeJsonGenerator {
  base: PackageJsonTemplate = {
    name: "",
    version: "1.0.",
    description: "",
    main: "index.js",
    scripts: {
      start: "",
      build: "",
      dev: "",
      test: "",
      install: "",
    },
    keywords: [],
    author: "",
    license: "ISC",
    type: "commonjs",
    dependencies: {},
    devDependencies: {},
  };

  constructor(params: {
    scripts?: { [key: string]: string };
    dependencies?: string[];
    devDependencies?: string[];
    type?: PackageJsonTemplate["type"];
  }) {
    const { dependencies, devDependencies, scripts, type } = params;

    if (dependencies?.length || devDependencies?.length) {
      let installScripts = [];
      if (dependencies?.length) {
        installScripts.push("npm i " + dependencies.join(" "));
      }
      if (devDependencies?.length) {
        installScripts.push("npm i -D " + devDependencies.join(" "));
      }

      this.base.scripts.install = installScripts.join(" && ");
    }

    Object.assign(this.base.scripts, scripts);

    if (type) {
      this.base.type = type;
    }
  }

  toJson() {
    return JSON.stringify(this.base, null, 2);
  }
}
