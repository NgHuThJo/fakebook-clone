import bcryptjs from "bcryptjs";
import { generateUser } from "./data-generator.js";
import User from "@/models/user.js";

export const createUser = async () => {
  const user = generateUser();
  const hashedPassword = await bcryptjs.hash(user.password, 10);
  await User.create({ ...user, password: hashedPassword });

  return user;
};
