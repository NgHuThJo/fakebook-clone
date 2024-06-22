import { model, Schema } from "mongoose";
import like from "./like.js";

const FeedSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
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
});

FeedSchema.set("toJSON", {
  getters: true,
  virtuals: false,
});

export default model("Feed", FeedSchema);
