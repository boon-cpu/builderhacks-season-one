import jwt from "jsonwebtoken";
import { Request } from "express";
import { IUserDocument, UserModel } from "../models/User.model";

const { JWT_SECRET: SECRET } = process.env;

export const COOKIE_NAME = "builderhacks_cookie";

export async function toUser(token: string): Promise<null | IUserDocument> {
  const body = jwt.verify(token, SECRET);

  if (typeof body === "string") {
    return null;
  }

  const { id = null } = body as {
    id: string;
  };

  return UserModel.findOne({ _id: id });
}

export function toToken(user: IUserDocument) {
  const payload = {
    id: user._id,
  } as const;

  const options = {
    expiresIn: "12 hours",
  } as const;

  const args = [payload, SECRET, options] as const;

  return jwt.sign(...args);
}

export function fromReq(request: Request): null | ReturnType<typeof toUser> {
  const token = request.cookies[COOKIE_NAME] as string | undefined;

  if (!token) {
    return null;
  }

  return toUser(token);
}
