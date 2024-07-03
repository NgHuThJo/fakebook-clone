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

    if (existingUser) {
      return {
        status: 400,
        message: {
          general: "Email address is already in use",
        },
      };
    }

    // const emailString = crypto.randomBytes(64).toString("hex");
    const hashedPassword = await bcryptjs.hash(password, saltLength);
    // isVerified is true for the sake of testing
    const newUser = await userRepository.create({
      username: username,
      email: email,
      password: hashedPassword,
      avatarUrl: avatarUrl || faker.image.avatar(),
      isVerified: true,
    });

    return {
      status: 200,
      data: newUser,
    };
  }

  async loginUser(email: string, password: string) {
    const user = await userRepository.findOne({
      email,
    });

    if (!user) {
      return {
        status: 401,
        message: {
          email: `Email address "${email}" is not associated with any account`,
        },
      };
    }

    if (!user.isVerified) {
      return {
        status: 401,
        message: {
          general: "Email address is not verified",
        },
      };
    }

    const doesPasswordMatch = await bcryptjs.compare(password, user.password);

    if (!doesPasswordMatch) {
      return {
        status: 401,
        message: {
          password: "Wrong password",
        },
      };
    }

    return {
      status: 200,
      data: user,
    };
  }

  async loginGuestUser() {
    let guest = await userRepository.findOne({ email: "guestemail@gmail.com" });

    if (!guest) {
      guest = await userRepository.create({
        username: "Guest Name",
        email: "guestemail@gmail.com",
        password: "guestpassword",
        avatarUrl: faker.image.avatar(),
        isVerified: true,
      });
    }

    return {
      status: 200,
      data: guest.toJSON(),
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
