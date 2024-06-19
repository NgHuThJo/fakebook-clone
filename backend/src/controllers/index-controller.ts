// Third party
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import debug from "debug";
import express from "express";
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
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    const existingUser = await User.findOne({ email: req.body.email }).exec();

    if (existingUser) {
      res.status(400).send({
        message:
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
      message: "User created successfully!",
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
        message: `The email address "${req.body.email}" is not associated with any account. Please check and try again!`,
      });
      return;
    }

    if (!user.isVerified) {
      res.status(401).send({
        message: "Your email has not been verified. Please check your emails!",
      });
      return;
    }

    const doesPasswordMatch = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!doesPasswordMatch) {
      res.status(401).send({ message: "Wrong password!" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({
      message: "User successfully logged in.",
      token,
    });
  }),
];

export const postLogout: express.RequestHandler = (req, res, next) => {
  req.logout((err: Error) => {
    if (err) {
      return next(err);
    }
  });

  res.json({
    message: "logout successful",
  });
};
