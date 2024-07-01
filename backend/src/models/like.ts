import { Document, model, Schema } from "mongoose";
import { IPost } from "./post.js";
import { IUser } from "./user.js";

export interface ILike extends Document {
  liker: Schema.Types.ObjectId | IUser;
  post: Schema.Types.ObjectId | IPost;
}

const LikeSchema = new Schema<ILike>({
  liker: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

export default model<ILike>("Like", LikeSchema);
