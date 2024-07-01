// Third party
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import debug from "debug";
import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import userService from "@/services/user-service.js";
// Models
import User, { IUser } from "../models/user.js";

const logger = debug("chat-app:indexController");
enum Role {
  Guest = "GUEST",
  Admin = "ADMIN",
}

export const postSignup = [
  userService.validateUser(),
  async (req: Request, res: Response) => {
    try {
      const { username, email, password, avatarUrl } = req.body;

      const result = await userService.signupUser(
        username,
        email,
        password,
        avatarUrl
      );

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        general: (error as Error).message,
      });
    }
  },
];

export const postLogin = [
  asyncHandler(async (req, res, next) => {
    const role: Role = req.body.role;

    if (role === Role.Guest) {
      const guest = await User.findOne({ email: "guestemail@gmail.com" });

      if (!guest) {
        const guest = new User({
          username: "Guestname",
          email: "guestemail@gmail.com",
          password: "somerandompassword",
          avatarUrl: faker.image.avatar(),
          isVerified: true,
        });

        await guest.save();
      }

      const token = jwt.sign({ guest }, process.env.JWT_SECRET);

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });

      res.json({
        message: "Guest successfully logged in",
      });

      return;
    }

    const user = await User.findOne({
      email: req.body.email,
    }).exec();

    if (!user) {
      res.status(401).send({
        email: `The email address "${req.body.email}" is not associated with any account. Please check and try again!`,
      });
      return;
    }

    if (!user.isVerified) {
      res.status(401).send({
        general: "Your email has not been verified. Please check your emails!",
      });
      return;
    }

    const doesPasswordMatch = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!doesPasswordMatch) {
      res
        .status(401)
        .send({ password: "Wrong password. Please check and try again!" });
      return;
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).send({
      message: "User successfully logged in.",
    });
  }),
];
