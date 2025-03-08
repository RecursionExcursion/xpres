export class JS_FileWriter {
  constructor(
    public importStatements: ModuleImport[],
    public lines: string[],
    private moduleType: "commonJs" | "esm" = "esm"
  ) {}

  generate() {
    const lineBreak = "\n";
    let script = "";

    this.importStatements.forEach((is) => {
      script += is[this.moduleType]() + lineBreak;
    });

    script += lineBreak;

    this.lines.forEach((l) => (script += l + lineBreak));

    return script;
  }
}

export class ModuleImport {
  destructured?: string[];
  default?: string;
  path!: string;
  
  constructor(params: Partial<ModuleImport> & { path: string }) {
    Object.assign(this, params);
  }

  esm() {
    const importObjects = [];

    if (this.default) {
      importObjects.push(this.default);
    }

    if (this.destructured) {
      importObjects.push(this.#toDestructredObjectString());
    }

    return ModuleImport.#createImportStatment(
      "esm",
      importObjects.join(", "),
      this.path
    );
  }

  commonJs() {
    const importObjects = this.default
      ? this.default
      : this.#toDestructredObjectString();

    return ModuleImport.#createImportStatment(
      "commonJs",
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

    return (type: "esm" | "commonJs", importObjects: string, path: string) => {
      const keyWords =
        type === "esm" ? [...esmKeyWords] : [...commonjsKeyWords];
      keyWords.splice(1, 0, importObjects);
      keyWords.splice(keyWords.length - 1, 0, path);
      return keyWords.join("");
    };
  })();
}
