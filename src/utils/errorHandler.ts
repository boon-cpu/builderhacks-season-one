import { ErrorRequestHandler } from "express";
import { Resp } from "../types/api";
import signale from "signale";

export const errorHandler: ErrorRequestHandler = async (
  err,
  req,
  res: Resp<null>,
  _next
) => {
  signale.error(err);
  res.status(418).json({
    success: false,
    data: {
      message: "Hey, server messed up",
    },
  });
};
