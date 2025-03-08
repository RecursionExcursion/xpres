import { pipe } from "../../../lib/pipe";
import { PojoFs } from "../../../lib/vfs";
import { Template } from "./templates/types";

export type Project = {
  devDependencies: Dependencies;
  dependencies: Dependencies;
  packageJson: Template;
  code: string;
  misc: { [key: string]: string };
};

export type ProjectParams = Omit<
  Project,
  "dependencies" | "devDependencies"
> & {
  devDependencies: string[];
  dependencies: string[];
};

export type Dependencies = {
  commands: {
    npm: string;
  };
  args: string[];
};

export function expressStarterFactory(project: ProjectParams): PojoFs {
  const { pojoFs } = pipe(addPackageJsonDependecies)(
    initDependencies({} as PojoFs, project)
  );

  return pojoFs;
}

type PipeParam = {
  pojoFs: PojoFs;
  project: Project;
};

function initDependencies(pojoFs: PojoFs, projectParams: ProjectParams) {
  const { dependencies, devDependencies, ...rest } = projectParams;
  const project: Project = {
    dependencies: {
      commands: {
        npm: "npm i",
      },
      args: dependencies,
    },
    devDependencies: {
      commands: {
        npm: "npm i -D",
      },
      args: devDependencies,
    },
    ...rest,
  };

  return { pojoFs, project };
}

function addPackageJsonDependecies(params: PipeParam) {
  const { pojoFs, project } = params;

  const pkgJsonFn = project.packageJson.fileName;
  const pkgJsonObj = project.packageJson.content;

  const dep = project.dependencies;
  const devDep = project.devDependencies;

  let installScripts: string[] = [];
  const scripts = pkgJsonObj.scripts as Record<string, string>;
  if (dep) {
    installScripts.push([dep.commands.npm, ...dep.args].join(" "));
  }
  if (devDep) {
    installScripts.push([devDep.commands.npm, ...devDep.args].join(" "));
  }
  scripts["install"] = installScripts.join(" && ");

  pojoFs[pkgJsonFn] = project.packageJson.toJSON();

  return params;
}

function addTs(params: PipeParam){
  const {pojoFs, project}= params;

  

}
