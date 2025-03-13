import { npmPackageGroups } from "../constants";
import { ProjectRequestDTO } from "../project-request-dto";

export const projectTemplates: Record<string, ProjectRequestDTO> = {
  ts: {
    name: "Foo",
    runtime: "node",
    packageJson: {
      dependencies: [...npmPackageGroups.express.dependency],
      devDependencies: [
        ...npmPackageGroups.express.typeDependency,
        ...npmPackageGroups.node.typeDependency,
      ],
      scripts: {},
      moduleType: "commonjs",
    },
    src: {
      includeFolder: true,
      domains: ["test", "foof"],
    },
    git: {
      toIgnore: ["/dist", ".env"],
    },
    env: {
      vars: {
        PORT: "8080",
      },
    },
    ts: {
      useDefaultNpmPackage: true,
      findTypeDependencies: true,
      config: {
        args: {},
      },
    },
  },

  js: {
    name: "Foo",
    runtime: "node",
    packageJson: {
      dependencies: [...npmPackageGroups.express.dependency],
      devDependencies: [],
      scripts: {},
      moduleType: "commonjs",
    },
    src: {
      includeFolder: true,
      domains: [],
    },
    git: {
      toIgnore: [".env"],
    },
    env: {
      vars: {
        PORT: "8080",
      },
    },
    ts: {
      useDefaultNpmPackage: false,
      findTypeDependencies: false,
      config: {
        args: {},
      },
    },
  },
};
