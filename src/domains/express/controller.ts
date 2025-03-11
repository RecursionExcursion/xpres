import { NextFunction, Request, Response } from "express";
import { expressService } from "./service";
import { zipFileMap } from "../../lib/zipper";
import { projectTemplates } from "./lib/project-templates";
import { RequestDTO } from "./requestDTO";
import { findNpmPacakgeVersion } from "./lib/npm-pacakge-finder";

export const expressController = {
  async createExpressStarter(req: Request, res: Response, next: NextFunction) {
    //TODO impl validation
    const payload = req.body as RequestDTO;

    res.setHeader("Content-Type", "application/zip");
    zipFileMap(await expressService.createExpressProject(payload), res);
  },

  async getExpressStarterTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { template } = req.params;

    console.log({ template });
    if (!projectTemplates[template]) {
      res.sendStatus(400);
      return;
    }

    res.setHeader("Content-Type", "application/zip");
    zipFileMap(
      await expressService.createExpressProject(projectTemplates[template]),
      res
    );
  },

  async test(req: Request, res: Response) {
    const { packageName } = req.params;

    const v = await findNpmPacakgeVersion(packageName);

    res.send({ v });
  },
};
