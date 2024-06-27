import { model, Schema } from "mongoose";

const FeedSchema = new Schema({
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

export default model("Feed", FeedSchema);
