import bcryptjs from "bcryptjs";
import { faker } from "@faker-js/faker";
import user from "@/models/user.js";
import {
  validateInput,
  validateEmail,
  handleValidationErrors,
} from "@/utils/validation-chains.js";

const saltLength = 10;

class UserService {
  async getUsers() {
    const users = await user.find({}, "username email avatarUrl");

    if (!users.length) {
      return {
        status: 400,
        message: {
          error: "No user found",
        },
      };
    }

    return {
      status: 200,
      data: users,
    };
  }

  async signupUser(
    username: string,
    email: string,
    password: string,
    avatarUrl?: string
  ) {
    const existingUser = await user.find({ email });

    if (existingUser.length) {
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
    const newUser = await user.create({
      username: username,
      email: email,
      password: hashedPassword,
      avatarUrl: avatarUrl || faker.image.avatar(),
      isVerified: true,
    });

    return {
      status: 201,
      message: {
        message: "Signup successful",
      },
    };
  }

  async loginUser(email: string, password: string) {
    const newUser = await user.findOne({
      email,
    });

    if (!newUser) {
      return {
        status: 401,
        message: {
          email: `Email address "${email}" is not associated with any account`,
        },
      };
    }

    if (!newUser.isVerified) {
      return {
        status: 401,
        message: {
          general: "Email address is not verified",
        },
      };
    }

    const doesPasswordMatch = await bcryptjs.compare(
      password,
      newUser.password
    );

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
      data: newUser,
      message: {
        message: "User login successful",
      },
    };
  }

  async loginGuestUser() {
    let guest = await user.findOne({ email: "guestemail@gmail.com" });

    if (!guest) {
      guest = await user.create({
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
