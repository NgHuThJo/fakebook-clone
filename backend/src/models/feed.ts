import { Document, model, Schema } from "mongoose";
import { IPost } from "./post.js";

export interface IFeed extends Document {
  post: Schema.Types.ObjectId | IPost;
  imgUrl: string;
}

const FeedSchema = new Schema<IFeed>({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

export default model<IFeed>("Feed", FeedSchema);
