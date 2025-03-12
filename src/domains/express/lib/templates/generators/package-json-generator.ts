import { findNpmPacakgeVersion } from "../../npm-pacakge-finder";

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

export async function generatePackageJson(params: {
  scripts?: { [key: string]: string };
  dependencies?: string[];
  devDependencies?: string[];
  type?: PackageJsonTemplate["type"];
}) {
  const base: PackageJsonTemplate = {
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
    dependencies: {},
    devDependencies: {},
  };

  const { dependencies, devDependencies, scripts, type } = params;

  if (type) {
    base.type = type;
  }

  if (dependencies?.length) {
    Object.assign(base.dependencies, await resolveDependencies(dependencies));
  }

  if (devDependencies?.length) {
    Object.assign(
      base.devDependencies,
      await resolveDependencies(devDependencies)
    );
  }

  Object.assign(base.scripts, scripts);

  return JSON.stringify(base, null, 2);
}

async function resolveDependencies(
  dep: string[]
): Promise<Record<string, string>> {
  return (
    await Promise.all(
      dep.map(async (d) => {
        const version = await findNpmPacakgeVersion(d);
        return version ? { name: d, version } : null;
      })
    )
  ).reduce((acc, curr) => {
    if (curr) {
      acc[curr.name] = `^${curr.version}`;
    }
    return acc;
  }, {} as Record<string, string>);
}
