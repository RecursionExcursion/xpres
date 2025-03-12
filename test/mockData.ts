import { ProjectMap } from "../src/domains/express/lib/starter-factory/project-factory";
import { ProjectRequestDTO } from "../src/domains/express/project-request-dto";

const mockProjectMap: ProjectMap = new Map<string, string>();

const mockRequestTs: ProjectRequestDTO = {
  name: "Foo",
  runtime: "node",
  packageJson: {
    dependencies: ["express"],
    devDependencies: ["typescript", "@types/express", "@types/node"],
    scripts: {},
    moduleType: "commonjs",
  },
  src: {
    use: true,
    includeFolder: true,
    domains: ["foo", "bar"],
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
};

const mockRequestJs: ProjectRequestDTO = {
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
    domains: ["foo", "bar"],
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
};

export const getMockProjectMap = () => structuredClone(mockProjectMap);
export const getMockRequestTs = () => structuredClone(mockRequestTs);
export const getMockRequestJs = () => structuredClone(mockRequestJs);
