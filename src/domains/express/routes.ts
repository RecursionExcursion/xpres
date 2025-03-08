import { Router } from "express";
import { expressController } from "./controller";

const expressRouter = Router();

expressRouter.get("/express", expressController.getExpressStarter )
expressRouter.post("/express", expressController.createExpressStarter )

export { expressRouter };
