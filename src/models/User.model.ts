import { model, Document, Schema } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  registered: Date;
}

export type IUserDocument = Document & IUser;

const schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registered: {
    type: Date,
    required: true,
  },
});

export const UserModel = model<IUserDocument>("User", schema);
