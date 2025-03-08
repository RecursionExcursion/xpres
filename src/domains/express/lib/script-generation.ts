export class ScriptGenerator {
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
  static #esmKeyWords = ["import ", ` from "`, `";`];
  static #commonjsKeyWords = ["const ", ` = require("`, `");`];
  constructor(public importObj: string, public path: string) {}

  esm() {
    const [imp, frm, semi] = ModuleImport.#esmKeyWords;
    return [imp, this.importObj, frm, this.path, semi].join("");
  }

  commonJs() {
    const [cnst, req, close] = ModuleImport.#commonjsKeyWords;
    return [cnst, this.importObj, req, this.path, close].join("");
  }

  static bundle(...params: string[][]) {
    return params.map((p) => new ModuleImport(p[0], p[1]));
  }
}
