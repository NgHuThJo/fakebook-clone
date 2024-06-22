// Third party
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import debug from "debug";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
// Models
import User, { UserType } from "../models/user.js";
import Token from "../models/token.js";
// Utility functions
import { validateInput, validateEmail } from "../services/validation-chains.js";

const logger = debug("chat-app:indexController");
const saltLength = 10;

export const postSignup = [
  validateEmail("email"),
  validateInput("username"),
  validateInput("password"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsObject: Record<string, string> = {};

      errors.array().forEach((error) => {
        if (error.type === "field") {
          errorsObject[error.path] = error.msg;
        }
      });

      res.status(400).json({
        errors: errorsObject,
      });
      return;
    }

    const existingUser = await User.findOne({ email: req.body.email }).exec();

    if (existingUser) {
      res.status(400).send({
        email:
          "This email address is already in use. Please try another email address!",
      });
      return;
    }

    const emailString = crypto.randomBytes(64).toString("hex");
    const hashedPassword = await bcryptjs.hash(req.body.password, saltLength);
    // isVerified is true for the sake of testing
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      isVerified: true,
    });

    await user.save();

    res.status(201).send({
      emailToken: emailString,
      message: "User created successfully.",
    });
  }),
];

export const postLogin = [
  asyncHandler(async (req, res, next) => {
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

    const token = jwt.sign({ user: user }, process.env.JWT_SECRET);

    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).send({
      message: "User successfully logged in.",
      token,
    });
  }),
];
