import { ModuleType } from "../../../constants";
import { ModuleExport } from "./module-export";
import { ModuleImportGenerator } from "./module-import";


interface JS_FileWriter_Interface {
  fileName: string;
  importGenerators: ModuleImportGenerator[];
  scriptLines: string[];
  moduleType?: ModuleType;
  ts: boolean;
  exportStatements?: ModuleExport;
}
export function generateJsFile(params: JS_FileWriter_Interface) {
  const {
    fileName,
    importGenerators: importStatements,
    scriptLines,
    moduleType,
    ts,
    exportStatements,
  } = params;

  const module = params.ts ? "module" : params.moduleType ?? "module";

  const lineBreak = "\n";
  let script = "";

  importStatements.forEach((is) => {
    if (ts) {
      script += is.module() + lineBreak;
    } else {
      script += is[module]() + lineBreak;
    }
  });

  script += lineBreak;

  scriptLines.forEach((l) => (script += l + lineBreak));

  script += lineBreak;

  script += exportStatements?.getExportStatement(ts);

  return script;
}

// export class JS_FileWriter implements JS_FileWriter_Interface {
//   fileName: string;
//   importStatements: ModuleImport[];
//   exportStatements?: ModuleExport;
//   scriptLines: string[];
//   moduleType: ModuleType;
//   ts: boolean;

//   constructor(params: JS_FileWriter_Interface) {
//     this.fileName = params.fileName;
//     this.importStatements = params.importStatements;
//     this.scriptLines = params.scriptLines;
//     this.ts = params.ts;
//     //If file is ts, esm will be used
//     this.exportStatements = params.exportStatements;
//   }

//   generate() {
//     const lineBreak = "\n";
//     let script = "";

//     this.importStatements.forEach((is) => {
//       if (this.ts) {
//         script += is.module() + lineBreak;
//       } else {
//         script += is[this.moduleType]() + lineBreak;
//       }
//     });

//     script += lineBreak;

//     this.scriptLines.forEach((l) => (script += l + lineBreak));

//     script += lineBreak;

//     script += this.exportStatements?.getExportStatement(this.ts);

//     return script;
//   }
// }
