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

  const module = ts ? "module" : moduleType ?? "module";

  const lineBreak = "\n";
  let script = "";

  if (importStatements.length) {
    importStatements.forEach((is) => {
      if (ts) {
        script += is.module();
      } else {
        script += is[module]();
      }
      script += lineBreak;
    });

    script += lineBreak;
  }

  scriptLines.forEach((l) => {
    script += l;
    script += lineBreak;
  });

  if (exportStatements) {
    script += lineBreak;
    script += exportStatements.getExportStatement(ts);
  }

  return script;
}
