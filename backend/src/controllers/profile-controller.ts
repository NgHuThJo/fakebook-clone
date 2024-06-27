import asyncHandler from "express-async-handler";
import debug from "debug";
import Feed from "@/models/feed.js";
import User from "@/models/user.js";
import { RequestHandler } from "express";

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

export const getFeeds: RequestHandler[] = [
  async (req, res, next) => {
    try {
      const feeds = await Feed.find().populate("post post.author");
      if (feeds) {
        res.json(feeds);
      }
    } catch (err) {
      console.error("Error fetching feeds:", err); // Add this line for logging
      res.status(500).json({
        error: err,
      });
    }
  },
];
