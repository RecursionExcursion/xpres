import Express from "express";
import { expressRouter } from "./domains/express/routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

const PORT = process.env.PORT;

const app = Express();

app.use(Express.json());

app.use("/", expressRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`App is listening ont PORT:${PORT}`);
});
