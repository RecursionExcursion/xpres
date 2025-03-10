import { ModuleType } from "../../../constants";
import { ModuleExport } from "../module-export";
import { ModuleImport } from "./module-import";

interface JS_FileWriter_Interface {
  fileName: string;
  importStatements: ModuleImport[];
  scriptLines: string[];
  moduleType?: ModuleType;
  ts: boolean;
  exportStatements?: ModuleExport;
}

export class JS_FileWriter implements JS_FileWriter_Interface {
  fileName: string;
  importStatements: ModuleImport[];
  exportStatements?: ModuleExport;
  scriptLines: string[];
  moduleType: ModuleType;
  ts: boolean;

  constructor(params: JS_FileWriter_Interface) {
    this.fileName = params.fileName;
    this.importStatements = params.importStatements;
    this.scriptLines = params.scriptLines;
    this.ts = params.ts;
    //If file is ts, esm will be used
    this.moduleType = params.ts ? "module" : params.moduleType ?? "module";
    this.exportStatements = params.exportStatements;
  }

  generate() {
    const lineBreak = "\n";
    let script = "";

    this.importStatements.forEach((is) => {
      if (this.ts) {
        script += is.module() + lineBreak;
      } else {
        script += is[this.moduleType]() + lineBreak;
      }
    });

    script += lineBreak;

    this.scriptLines.forEach((l) => (script += l + lineBreak));

    script += lineBreak;

    script += this.exportStatements?.getExportStatement(this.ts);

    return script;
  }
}
