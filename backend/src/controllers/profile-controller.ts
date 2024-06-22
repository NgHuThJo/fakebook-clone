import asyncHandler from "express-async-handler";
import debug from "debug";
import express from "express";
import User from "@/models/user.js";

export const getUsers = [
  asyncHandler((req, res, next) => {
    User.find({})
      .then((foundUsers) => {
        if (foundUsers) {
          res.json({
            users: foundUsers,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }),
];
