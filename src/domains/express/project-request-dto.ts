import { ModuleType } from "./constants";

export type ProjectRequestDTO = {
  name: string;
  runtime: "node";
  packageJson: {
    moduleType: ModuleType;
    dependencies: string[];
    devDependencies: string[];
    scripts: { [key: string]: string };
  };
  src?: {
    includeFolder: boolean;
    domains: string[];
  };
  git?: {
    toIgnore: string[];
  };
  env?: {
    vars: {
      [key: string]: string;
    };
  };
  ts?: {
    useDefaultNpmPackage: boolean;
    findTypeDependencies: boolean;
    config: {
      args: {
        [key: string]: string;
      };
    };
  };
};
