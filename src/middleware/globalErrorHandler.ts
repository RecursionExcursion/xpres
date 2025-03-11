import { Request, Response, NextFunction } from "express";

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  //TODO
  console.error(err);
  res.status(500).send("Something went wrong! :(");
}
