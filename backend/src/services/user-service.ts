import bcryptjs from "bcryptjs";
import { faker } from "@faker-js/faker";
import userRepository from "@/db/user-repository.js";
import {
  validateInput,
  validateEmail,
  handleValidationErrors,
} from "@/utils/validation-chains.js";

const saltLength = 10;

class UserService {
  async signupUser(
    username: string,
    email: string,
    password: string,
    avatarUrl?: string
  ) {
    const existingUser = await userRepository.find({ email });

    console.log(existingUser);

    if (existingUser) {
      throw new Error("Email address is already in use");
    }

    // const emailString = crypto.randomBytes(64).toString("hex");
    const hashedPassword = await bcryptjs.hash(password, saltLength);
    // isVerified is true for the sake of testing
    const user = await userRepository.create({
      username: username,
      email: email,
      password: hashedPassword,
      avatarUrl: avatarUrl || faker.image.avatar(),
      isVerified: true,
    });

    return {
      message: "User created successfully",
    };
  }

  validateUser() {
    return [
      validateEmail("email"),
      validateInput("username"),
      validateInput("password"),
      handleValidationErrors,
    ];
  }
}

export default new UserService();
