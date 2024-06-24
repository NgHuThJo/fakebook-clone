import { model, Schema } from "mongoose";
import like from "./like.js";

const FeedSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
    immutable: true,
    get: (date: Date) => date.toLocaleDateString("en-US"),
  },
  imgUrl: {
    type: String,
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
});

FeedSchema.set("toJSON", {
  getters: true,
  virtuals: false,
});

export default model("Feed", FeedSchema);
