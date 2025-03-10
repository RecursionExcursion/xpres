import { ModuleType } from "./constants";

export type RequestDTO = {
  runtime: "node";
  packageJson: {
    moduleType: ModuleType;
    dependencies: string[];
    devDependencies: string[];
    scripts: { [key: string]: string };
  };
  src: {
    use: boolean;
    includeFolder: boolean;
    domains: string[];
  };
  git: {
    ignore: boolean;
    toIgnore: string[];
  };
  env: {
    use: boolean;
    vars: {
      [key: string]: string;
    };
  };
  ts: {
    use: boolean;
    useDefaultNpmPackage: boolean;
    findTypeDependencies: boolean;
    config: {
      use: true;
      args: {
        [key: string]: string;
      };
    };
  };
};
