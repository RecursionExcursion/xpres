import { Router } from "express";
import { expressController } from "./controller";

const expressRouter = Router();

const path = "/express";

expressRouter.get(
  path + "/starter" + "/:template",
  expressController.getExpressStarterTemplate
);
expressRouter.post(path, expressController.createExpressStarter);
expressRouter.get(path + "/templates", expressController.getTemplates);
expressRouter.get("/test/:packageName", expressController.test);

export { expressRouter };
