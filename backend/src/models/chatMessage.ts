import { get, model, Schema } from "mongoose";

const ChatMessageSchema = new Schema({
  chatRoomId: {
    type: Schema.Types.ObjectId,
    ref: "ChatRoom",
  },
  sender: String,
  message: String,
  created: {
    type: Date,
    default: Date.now,
    immutable: true,
    get: (date: Date) => date.toLocaleDateString("en-US"),
  },
});

ChatMessageSchema.set("toJSON", {
  getters: true,
  virtuals: false,
});

export default model("ChatMessage", ChatMessageSchema);
