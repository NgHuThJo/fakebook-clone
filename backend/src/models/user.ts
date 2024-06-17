import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must have at least 8 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model("User", UserSchema);
