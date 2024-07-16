import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.js";

export interface IFollower extends Document {
  follower: Schema.Types.ObjectId;
  followed: Schema.Types.ObjectId;
}

const FollowerSchema = new Schema<IFollower>(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followed: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IFollower>("Follower", FollowerSchema);
