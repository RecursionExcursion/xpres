export const PACKAGE_JSON = "package.json";
export const GIT_IGNORE = ".gitignore";
export const ENV = ".env";

export const TS_CONFIG = "tsconfig.json";

export type ModuleType = "commonjs" | "module";

type NpmPackageGroup = {
  dependency: Array<string>;
  devDependency: Array<string>;
  typeDependency: Array<string>;
};

export const npmPackageGroups: Record<string, NpmPackageGroup> = {
  node: {
    dependency: [],
    devDependency: [],
    typeDependency: ["@types/node"],
  },
  express: {
    dependency: ["express"],
    devDependency: [],
    typeDependency: ["@types/express"],
  },
  typescript: {
    dependency: [],
    devDependency: ["typescript"],
    typeDependency: [],
  },
};
