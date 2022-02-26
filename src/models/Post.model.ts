import { model, Document, Schema } from "mongoose";

export interface IPost {
  userId: string;
  content: string;
  date: Date;
}

export type IPostDocument = Document & IPost;

const schema = new Schema<IPost>({
  userId: {
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

export const PostModel = model<IPostDocument>("Post", schema);
