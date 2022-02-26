import { fromReq } from "./jwt";
import { Request, Response } from "express";

export async function isAuthenticated(
  request: Request,
  response: Response,
  next: () => void
) {
  const userModel = await fromReq(request);
  if (!userModel) {
    return response.status(403).json({
      success: false,
      data: {
        message: "You need to be authenticated to do that!",
      },
    });
  }

  response.locals.userModel = userModel;

  next();
}
