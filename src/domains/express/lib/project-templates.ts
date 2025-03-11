import { RequestDTO } from "../requestDTO";

export const projectTemplates: Record<string, RequestDTO> = {
  ts: {
    name: "Foo",
    runtime: "node",
    packageJson: {
      dependencies: ["express"],
      devDependencies: ["@types/express", "@types/node"],
      scripts: {},
      moduleType: "commonjs",
    },
    src: {
      use: true,
      includeFolder: true,
      domains: ["test", "foof"],
    },
    git: {
      ignore: true,
      toIgnore: ["/dist", ".env"],
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
  },

  js: {
    name: "Foo",
    runtime: "node",
    packageJson: {
      dependencies: ["express"],
      devDependencies: [],
      scripts: {},
      moduleType: "commonjs",
    },
    src: {
      use: true,
      includeFolder: true,
      domains: [],
    },
    git: {
      ignore: true,
      toIgnore: [".env"],
    },
    env: {
      use: true,
      vars: {
        PORT: "8080",
      },
    },
    ts: {
      use: false,
      useDefaultNpmPackage: false,
      findTypeDependencies: false,
      config: {
        use: false,
        args: {},
      },
    },
  },
};
