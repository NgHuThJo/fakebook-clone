import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.js";

export interface IPost extends Document {
  author: Schema.Types.ObjectId | IUser;
  title: string;
  post: string;
  created: Date;
  likesCount: number;
  comments: Array<Schema.Types.ObjectId | IPost>;
}

const PostSchema = new Schema<IPost>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minLength: [1, "Title must not be empty"],
  },
  post: {
    type: String,
    required: true,
    minLength: [1, "Post must not be empty"],
  },
  created: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

PostSchema.virtual("formattedDate").get(function (this: IPost) {
  return this.created.toLocaleDateString("en-US");
});

PostSchema.set("toJSON", {
  // getters: true,
  virtuals: true,
});

export default model<IPost>("Post", PostSchema);
