import { Router } from "express";
import { expressController } from "./controller";

const expressRouter = Router();

const path = "/express";

expressRouter.get(path, expressController.getExpressStarter);
expressRouter.post(path, expressController.createExpressStarter);

export { expressRouter };
