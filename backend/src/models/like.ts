import { model, Schema } from "mongoose";

const LikeSchema = new Schema({
  liker: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

export default model("Like", LikeSchema);
