import { NextFunction, Request, Response } from "express";
import { expressService } from "./service";
import { zip, zipFileMap } from "../../lib/zipper";

export const expressController = {
  async getExpressStarter(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Content-Type", "application/zip");
    zipFileMap(expressService.createExpressProject(), res);
  },

  async createExpressStarter(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Content-Type", "application/zip");
    zipFileMap(expressService.createExpressProject(), res);
  },
};
