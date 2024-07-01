import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  isVerified: boolean;
  avatarUrl: string;
}

const UserSchema = new Schema<IUser>({
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

export default model<IUser>("User", UserSchema);
