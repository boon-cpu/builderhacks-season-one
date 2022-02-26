import { model, Document, Schema } from "mongoose";

export interface IComment {
  userId: string;
  postId: string;
  content: string;
  date: Date;
}

export type ICommentDocument = Document & IComment;

const schema = new Schema<IComment>({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

export const CommentModel = model<ICommentDocument>("Comment", schema);
