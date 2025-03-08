import { NextFunction, Request, Response } from "express";
import { expressService } from "./service";
import { zip } from "../../lib/zipper";
import { ModuleImport, JS_FileWriter } from "./lib/script-generation";

export const expressController = {
  async getExpressStarter(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Content-Type", "application/zip");
    zip(expressService.createExpressStarter(), res);
  },

  async createExpressStarter(req: Request, res: Response, next: NextFunction) {
    const scriptGen = new JS_FileWriter(
      [
        new ModuleImport({
          path: "express",
          default: "Express",
        }),
      ],
      [
        "const app = Express();",
        `app.listen(8080, () => console.log('App listening on PORT ' + 8080);`,
      ], 
      "commonJs"
    );

    console.log(scriptGen.generate());

    res.sendStatus(200);
  },
};
