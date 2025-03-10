import { ModuleType } from "../../../constants";

export class ModuleImport {
  destructured?: string[];
  default?: string;
  path!: string;

  constructor(params: Partial<ModuleImport> & { path: string }) {
    Object.assign(this, params);
  }

  module(): string {
    const importObjects = [];

    if (this.default) {
      importObjects.push(this.default);
    }

    if (this.destructured) {
      importObjects.push(this.#toDestructredObjectString());
    }

    return ModuleImport.#createImportStatment(
      "module",
      importObjects.join(", "),
      this.path
    );
  }

  commonjs(): string {
    const importObjects = this.default
      ? this.default
      : this.#toDestructredObjectString();

    return ModuleImport.#createImportStatment(
      "commonjs",
      importObjects,
      this.path
    );
  }

  #toDestructredObjectString() {
    const objs = this.destructured;
    return objs?.length ? `{ ${objs?.join(", ")} }` : "";
  }

  static #createImportStatment = (() => {
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
}
