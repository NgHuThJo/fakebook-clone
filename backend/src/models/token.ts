import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.js";

export interface IToken extends Document {
  userId: Schema.Types.ObjectId | IUser;
  emailString: string;
}

const TokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  emailString: {
    type: String,
    required: true,
    length: [128, "Random generated email string must have 128 characters."],
  },
});

export default model<IToken>("Token", TokenSchema);
