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
        as: "post",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "author",
              foreignField: "_id",
              as: "author",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    email: 1,
                  },
                },
              ],
            },
          },
          {
            $unwind: "$author",
          },
          {
            $addFields: {
              created: {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$created",
                },
              },
            },
          },
          {
            $project: {
              __v: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: "$post",
    },
    {
      $project: {
        __v: 0,
      },
    },
  ]);

  return result;
};

feedPipeline();

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
