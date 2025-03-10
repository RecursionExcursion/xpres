import { projectFactory } from "./lib/project-factory";
import { RequestDTO } from "./requestDTO";

export const expressService = {
  createExpressProject() {
    //This will be passed as a arg
    const request: RequestDTO = {
      runtime: "node",
      packageJson: {
        dependencies: [],
        devDependencies: [],
        scripts: {},
        moduleType: "commonjs",
      },
      src: {
        use: true,
        includeFolder: true,
        domains: ["foofers", "poofers"],
      },
      git: {
        ignore: true,
        toIgnore: ["/test", "/dist"],
      },
      env: {
        use: true,
        vars: {
          PORT: "8080",
        },
      },
      ts: {
        use: true,
        useDefaultNpmPackage: true,
        findTypeDependencies: true,
        config: {
          use: true,
          args: {},
        },
      },
    };

    return projectFactory(request);
  },
};
