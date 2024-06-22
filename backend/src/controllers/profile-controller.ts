import asyncHandler from "express-async-handler";
import debug from "debug";
import express from "express";
import User from "@/models/user.js";

export const getUsers = [
  asyncHandler(async (req, res, next) => {
    const users = await User.find({}).exec();

    if (!users) {
      res.status(404).json({
        error: "Users not found",
      });

      return;
    }

    res.json(users);
  }),
];
