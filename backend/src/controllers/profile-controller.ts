import asyncHandler from "express-async-handler";
import debug from "debug";
import { RequestHandler } from "express";
import userService from "@/services/user-service.js";
import profileService from "@/services/profile-service.js";

export const getUsers = [
  asyncHandler(async (req, res, next) => {
    const response = await userService.getUsers();

    if (response.status >= 400) {
      res.status(response.status).json(response.message);
    }

    res.status(response.status).json(response.data);
  }),
];

export const getFeeds: RequestHandler[] = [
  async (req, res, next) => {
    try {
      const response = await profileService.getFeeds();

      if (response.status >= 400) {
        res.status(response.status).json(response.message);
      }

      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
];

export const postLike = [
  asyncHandler(async (req, res, next) => {
    const { postId } = req.body;
    const { user } = req;

    if (!postId) {
      res.status(400).json({
        error: "Post is required",
      });
    }

    const likesCount = await profileService.setLike(user._id, postId);

    res.json({
      likesCount,
    });
  }),
];

export const postFriendship = [
  asyncHandler(async (req, res, next) => {
    const { receiverId } = req.body;
    const { user } = req;

    const response = await profileService.createFriendship(
      user._id,
      receiverId
    );

    res.status(response.status).json(response.message);
  }),
];

export const getFriendship = [
  asyncHandler(async (req, res, next) => {
    const { user } = req;

    const response = await profileService.getFriendshipList(user._id);

    res.status(response.status).json(response.data);
  }),
];
