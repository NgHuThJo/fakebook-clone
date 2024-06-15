import { model, Schema } from "mongoose";

const ChatRoomSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("ChatRoom", ChatRoomSchema);
