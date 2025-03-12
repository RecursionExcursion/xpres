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
};

export const getMockProjectMap = () => structuredClone(mockProjectMap);
export const getMockRequest = () => structuredClone(mockRequestTs);
