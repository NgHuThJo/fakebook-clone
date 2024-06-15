// Third party
import asyncHandler from "express-async-handler";
import debug from "debug";
import * as express from "express";
// Models
import User from "../models/user.js";

const logger = debug("chat-app:userController");

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne(
    { _id: req.params.id },
    { password: 0 }
  ).exec();

  res.json(user);
});

export const getUserList = asyncHandler(async (req, res, next) => {
  const userList = await User.find({}, { password: 0 }).exec();

  res.json(userList);
});
