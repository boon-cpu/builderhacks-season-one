import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { ClassController } from "./ClassController";
import { Request } from "express";
import { Resp } from "../types/api";
import { isAuthenticated } from "../utils/isAuthenticated";
import { CommentType } from "../types/types";
import { CommentModel } from "../models/Comment.model";
import { UserModel } from "../models/User.model";

@Controller("comments")
@ClassMiddleware([isAuthenticated])
export class CommentsController extends ClassController {
  @Get("comment")
  async getComments(req: Request, res: Resp<CommentType[]>) {
    const { postId } = req.query;

    if (!postId) {
      return res
        .status(400)
        .json({ success: false, data: { message: "if you see this, run!" } });
    }

    const commentModels = await CommentModel.find({ postId })
      .sort("_id")
      .select("content date userId");

    const comments: CommentType[] = [];
    for (const commentModel of commentModels) {
      comments.push({
        _id: commentModel._id,
        content: commentModel.content,
        date: commentModel.date.toISOString(),
        username: (await UserModel.findOne({ _id: commentModel.userId }))
          .username,
      });
    }

    return res.status(200).json({ success: true, data: comments });
  }

  @Post("comment")
  async postComment(req: Request, res: Resp) {
    const { content, postId } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ success: false, data: { message: "Content required" } });
    }

    if (!postId) {
      return res.status(400).json({ success: false, data: { message: "wOt" } });
    }

    new CommentModel({
      userId: res.locals.userModel._id,
      postId,
      content,
    }).save();

    return res.status(200).json({ success: true });
  }
}
