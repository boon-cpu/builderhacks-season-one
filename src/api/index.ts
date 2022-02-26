import { ChildControllers, Controller, Get } from "@overnightjs/core";
import { ClassController } from "./ClassController";
import { Request, Response } from "express";
import { AuthController } from "./auth.controller";
import { PostsController } from "./post.controller";

@Controller("api")
@ChildControllers([new AuthController(), new PostsController()])
export class BigController extends ClassController {
  @Get("/")
  get(req: Request, res: Response) {
    res.json({ whenTheHello: "world" });
  }
}
