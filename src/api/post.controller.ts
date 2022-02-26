import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { PostType } from "../types/types";
import { isAuthenticated } from "../utils/isAuthenticated";
import { ClassController } from "./ClassController";
import { Request } from "express";
import { PostModel } from "../models/Post.model";
import { UserModel } from "../models/User.model";
import { Resp } from "../types/api";

@Controller("posts")
@ClassMiddleware([isAuthenticated])
export class PostsController extends ClassController {
  @Get("post")
  async getPosts(req: Request, res: Resp<PostType[]>) {
    const { id } = req.query;

    const postModels = await PostModel.find(id ? { _id: { $lt: id } } : {})
      .sort("-_id")
      .limit(5)
      .select("date userId content");

    const posts: PostType[] = [];

    for (const postModel of postModels) {
      posts.push({
        _id: postModel._id,
        date: postModel.date.toISOString(),
        content: postModel.content,
        username: (await UserModel.findOne({ _id: postModel.userId })).username,
      });
    }
    return res.status(200).json({ success: true, data: posts });
  }

  @Post("post")
  async createPost(req: Request, res: Resp) {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        success: false,
        data: { message: "Message content required" },
      });
    }

    await new PostModel({
      userId: res.locals.userModel._id,
      content,
    }).save();

    return res.status(200).json({ success: true });
  }

  @Get("getpost")
  async getPost(req: Request, res: Resp<PostType>) {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, data: { message: "woops" } });
    }

    const postModel = await PostModel.findOne({ _id: id });
    const post = {
      _id: postModel._id,
      date: postModel.date.toISOString(),
      content: postModel.content,
      username: (await UserModel.findOne({ _id: postModel.userId })).username,
    };
    return res.status(200).json({ success: true, data: post });
  }
}
