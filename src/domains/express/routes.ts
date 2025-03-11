import { Router } from "express";
import { expressController } from "./controller";

const expressRouter = Router();

const path = "/express";

expressRouter.get(
  path + "/:template",
  expressController.getExpressStarterTemplate
);
expressRouter.post(path, expressController.createExpressStarter);
expressRouter.get("/test/:packageName", expressController.test);

export { expressRouter };
