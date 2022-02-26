import {
  ClassMiddleware,
  Controller,
  Delete,
  Get,
  Post,
} from "@overnightjs/core";
import { CommentType, PostType } from "../types/types";
import { isAuthenticated } from "../utils/isAuthenticated";
import { ClassController } from "./ClassController";
import { isValidObjectId } from "mongoose";
import { Request } from "express";
import { PostModel } from "../models/Post.model";
import { CommentModel } from "../models/Comment.model";
import { UserModel } from "../models/User.model";
import { Resp } from "../types/api";

@Controller("posts")
@ClassMiddleware([isAuthenticated])
export class PostsController extends ClassController {
  @Get("post")
  async getPosts(
    req: Request,
    res: Resp<{ post: PostType; comments: CommentType[] }[]>
  ) {
    const { id } = req.query;

    const postModels = await PostModel.find(id ? { _id: { $lt: id } } : {})
      .sort("-_id")
      .limit(5)
      .select("date userId content");

    const postComments: { post: PostType; comments: CommentType[] }[] = [];

    for (const postModel of postModels) {
      const post = {
        _id: postModel._id,
        date: postModel.date.toISOString(),
        content: postModel.content,
        username: (await UserModel.findOne({ _id: postModel.userId })).username,
      };
      const commentModels = await CommentModel.find({ postId: id }).select(
        "date userId content"
      );
      const comments = [];
      for (const commentModel of commentModels) {
        comments.push({
          _id: commentModel._id,
          content: commentModel.content,
          date: commentModel.date,
          username: UserModel.findOne({ _id: commentModel.userId }),
        });
      }

      postComments.push({ post, comments });
    }
    return res.status(200).json({ success: true, data: postComments });
  }

  @Post("post")
  async createPost(req: Request, res: Resp<PostType>) {
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
  async getPost(
    req: Request,
    res: Resp<{ post: PostType; comments: CommentType[] }>
  ) {
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
    const commentModels = await CommentModel.find({ postId: id }).select(
      "date userId content"
    );
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
    return res.status(200).json({ success: true, data: { post, comments } });
  }
}
