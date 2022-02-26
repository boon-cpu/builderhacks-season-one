import { Controller, Get, Post } from "@overnightjs/core";
import { ClassController } from "./ClassController";
import { UserType } from "../types/types";
import { Request } from "express";
import { UserModel } from "../models/User.model";
import { createHash, verifyHash } from "../utils/hash";
import { COOKIE_NAME, toToken } from "../utils/jwt";
import { Resp } from "../types/api";
@Controller("auth")
export class AuthController extends ClassController {
  @Post("login")
  async login(req: Request, res: Resp<UserType>) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        data: { message: "Both username and password are required!" },
      });
    }

    const userModel = await UserModel.findOne({ username: username });

    if (!userModel) {
      return res.status(400).json({
        success: false,
        data: { message: "Account with that username not found!" },
      });
    }

    if (!(await verifyHash(password, userModel.password))) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Yeah wrong password",
        },
      });
    }

    const token = toToken(userModel);

    return res
      .cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: !process.env.APP_URI.includes("localhost"),
        sameSite: "strict",
      })
      .status(200)
      .json({ success: true });
  }

  @Post("signup")
  async signup(req: Request, res: Resp<UserType>) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        data: { message: "Username and password required!" },
      });
    }

    let userModel = await UserModel.findOne({ username });

    if (userModel) {
      return res.status(400).json({
        success: false,
        data: { message: "User with that name already exists!" },
      });
    }

    userModel = await new UserModel({
      username,
      password: await createHash(password),
    }).save();

    const token = toToken(userModel);

    res
      .cookie(COOKIE_NAME, token, {
        httpOnly: true,
        secure: !process.env.APP_URI.includes("localhost"),
        sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
      });
  }

  @Get("logout")
  logout(req: Request, res: Resp) {
    res.clearCookie(COOKIE_NAME);

    return res.status(200).json({
      success: true,
    });
  }
}
