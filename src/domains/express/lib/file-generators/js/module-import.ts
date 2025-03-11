import { ModuleType } from "../../../constants";

const createImportStatment = (() => {
  const esmKeyWords = ["import ", ` from "`, `";`];
  const commonjsKeyWords = ["const ", ` = require("`, `");`];

  return (type: ModuleType, importObjects: string, path: string) => {
    const keyWords =
      type === "module" ? [...esmKeyWords] : [...commonjsKeyWords];
    keyWords.splice(1, 0, importObjects);
    keyWords.splice(keyWords.length - 1, 0, path);
    return keyWords.join("");
  };
})();

export type ModuleImportGenerator = {
  module: () => string;
  commonjs: () => string;
};

interface ModuleImport {
  destructuredImports?: string[];
  defaultImport?: string;
  path: string;
}

export function createModuleImport(
  params: ModuleImport
): ModuleImportGenerator {
  const { path, defaultImport, destructuredImports = [] } = params;

  const module = () => {
    const importObjects = [];

    if (defaultImport) {
      importObjects.push(defaultImport);
    }

    if (destructuredImports) {
      importObjects.push(toDestructredObjectString(destructuredImports));
    }

    return createImportStatment("module", importObjects.join(", "), path);
  };

  const commonjs = () => {
    const importObjects = defaultImport
      ? defaultImport
      : toDestructredObjectString(destructuredImports);

    return createImportStatment("commonjs", importObjects, path);
  };

  return { module, commonjs };
}

function toDestructredObjectString(destructuredImportObjs: string[]) {
  const objs = destructuredImportObjs;
  return objs?.length ? `{ ${objs?.join(", ")} }` : "";
}

// static #createImportStatment = (() => {
//   const esmKeyWords = ["import ", ` from "`, `";`];
//   const commonjsKeyWords = ["const ", ` = require("`, `");`];

//   return (type: ModuleType, importObjects: string, path: string) => {
//     const keyWords =
//       type === "module" ? [...esmKeyWords] : [...commonjsKeyWords];
//     keyWords.splice(1, 0, importObjects);
//     keyWords.splice(keyWords.length - 1, 0, path);
//     return keyWords.join("");
//   };
// })();

// export class ModuleImport2 {
//   destructured?: string[];
//   default?: string;
//   path!: string;

//   constructor(params: Partial<ModuleImport> & { path: string }) {
//     Object.assign(this, params);
//   }

//   module(): string {}

//   commonjs(): string {
//     const importObjects = this.default
//       ? this.default
//       : this.#toDestructredObjectString();

//     return ModuleImport.#createImportStatment(
//       "commonjs",
//       importObjects,
//       this.path
//     );
//   }

//   // #toDestructredObjectString() {
//   //   const objs = this.destructured;
//   //   return objs?.length ? `{ ${objs?.join(", ")} }` : "";
//   // }

//   // static #createImportStatment = (() => {
//   //   const esmKeyWords = ["import ", ` from "`, `";`];
//   //   const commonjsKeyWords = ["const ", ` = require("`, `");`];

//   //   return (type: ModuleType, importObjects: string, path: string) => {
//   //     const keyWords =
//   //       type === "module" ? [...esmKeyWords] : [...commonjsKeyWords];
//   //     keyWords.splice(1, 0, importObjects);
//   //     keyWords.splice(keyWords.length - 1, 0, path);
//   //     return keyWords.join("");
//   //   };
//   // })();
// }
