import { model, Document, Schema } from "mongoose";

export interface IComment {
  userId: string;
  postId: string;
  content: string;
  imageUrl: string;
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
  imageUrl: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
