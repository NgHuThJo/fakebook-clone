import asyncHandler from "express-async-handler";
import debug from "debug";
import Feed from "@/models/feed.js";
import User from "@/models/user.js";

export const getUsers = [
  asyncHandler((req, res, next) => {
    User.find({}, "username email avatarUrl")
      .then((foundUsers) => {
        if (foundUsers) {
          res.json(foundUsers);
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }),
];

export const getFeeds = [
  asyncHandler((req, res, next) => {
    Feed.find({})
      .then((foundFeeds) => {
        if (foundFeeds) {
          res.json(foundFeeds);
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }),
];
