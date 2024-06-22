import { model, Schema } from "mongoose";

export type UserType = {
  username: string;
  password: string;
  email: string;
  isVerified: boolean;
};

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
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatarUrl: String,
});

export default model("User", UserSchema);
