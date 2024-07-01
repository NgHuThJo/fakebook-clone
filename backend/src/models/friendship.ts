import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.js";

export interface IFriendship extends Document {
  sender: Schema.Types.ObjectId | IUser;
  receiver: Schema.Types.ObjectId | IUser;
  status: "pending" | "accepted" | "rejected";
}

const FriendshipSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Friendship", FriendshipSchema);
