import { NextFunction, Request, Response } from "express";
import { expressService } from "./service";
import { zipFileMap } from "../../lib/zipper";
import { projectTemplates } from "./lib/project-templates";
import { ProjectRequestDTO } from "./project-request-dto";
import { findNpmPacakgeVersion } from "./lib/npm-pacakge-finder";

export const expressController = {
  async createExpressStarter(req: Request, res: Response, next: NextFunction) {
    //TODO impl validation
    const payload = req.body as ProjectRequestDTO;

    res.setHeader("Content-Type", "application/zip");
    zipFileMap(await expressService.createExpressStarterProject(payload), res);
  },

  async getExpressStarterTemplate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { template } = req.params;

    if (!projectTemplates[template]) {
      res.sendStatus(400);
      return;
    }

    res.setHeader("Content-Type", "application/zip");
    zipFileMap(
      await expressService.createExpressStarterProject(projectTemplates[template]),
      res
    );
  },

  async test(req: Request, res: Response) {
    const { packageName } = req.params;

    const v = await findNpmPacakgeVersion(packageName);

    res.send({ v });
  },
};
