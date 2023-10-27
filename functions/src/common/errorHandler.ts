import type { ErrorRequestHandler } from "express";
import * as logger from "firebase-functions/logger";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err);
  res.status(500).send("System Error");
};
