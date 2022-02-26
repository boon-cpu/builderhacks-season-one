import { IUser } from "../models/User.model";
import e from "express";

type SuccessfulAPIResponse<Body> = {
  success: true;
  data?: Body;
};

type FailedAPIResponse = {
  success: false;
  data: { message: string };
};

type NulledAPIResponse = {
  success: boolean;
};

type PotentiallyUser<Body> = Body extends IUser
  ? SuccessfulAPIResponse<IUser>
  : Body extends IUser[]
  ? SuccessfulAPIResponse<IUser>
  : SuccessfulAPIResponse<Body>;

export type APIResponse<Body> =
  | FailedAPIResponse
  | (Body extends null ? NulledAPIResponse : PotentiallyUser<Body>);

export type Resp<Body = null> = e.Response<APIResponse<Body>>;
