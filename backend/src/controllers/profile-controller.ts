import asyncHandler from "express-async-handler";
import debug from "debug";
import { Feed, Post, User } from "@/models/index.js";
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

const feedPipeline = async () => {
  const result = await Feed.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              __v: 0,
            },
          },
        ],
        as: "post",
      },
    },
    {
      $unwind: {
        path: "$post",
      },
    },
  ]);

  return result;
};

export const getFeeds: RequestHandler[] = [
  async (req, res, next) => {
    try {
      const feeds = await feedPipeline();

      if (feeds) {
        res.json(feeds);
      }
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  },
];
