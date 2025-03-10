import { ModuleType } from "../../constants";

type ExportType = "default" | "destructured";

export class ModuleExport {
  moduleType: ModuleType;
  exportType: ExportType;
  args: string[];

  constructor(moduleType: ModuleType, exportType: ExportType, args: string[]) {
    this.moduleType = moduleType;
    this.exportType = exportType;
    this.args = args;
  }

  getExportStatement(ts = false) {
    if (ts || this.moduleType === "module") {
      return this.#esmExportTemplate();
    }

    if (this.moduleType === "commonjs") {
      return this.#commonjsExportTemplate();
    }

    throw Error("Invalid module type");
  }

  #commonjsExportTemplate = () => {
    const args =
      this.exportType === "default"
        ? this.args[0]
        : `{ ${this.args.join(", ")} }`;
    return `module.exports = ${args}`;
  };

  //If 'both' is selected the first arg is the default export
  #esmExportTemplate = () => {
    const args =
      this.exportType === "default"
        ? `default ${this.args[0]}`
        : `{ ${this.args.join(", ")} }`;
    return `export ${args}`;
  };
}
