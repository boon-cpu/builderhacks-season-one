export type UserType = {
  _id: string;
  username: StringConstructor;
};
export type PostType = {
  _id: string;
  username: string;
  content: string;
  date: string;
};

export type CommentType = {
  _id: string;
  content: string;
  date: string;
  username: string;
};
