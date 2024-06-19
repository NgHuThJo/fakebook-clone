import { model, Schema } from "mongoose";

const TokenSchema = new Schema({
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

export default model("Token", TokenSchema);
