import { get, model, Schema } from "mongoose";

const PostSchema = new Schema({
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
    get: (date: Date) => date.toLocaleDateString("en-US"),
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

PostSchema.set("toJSON", {
  getters: true,
  virtuals: false,
});

export default model("Post", PostSchema);
