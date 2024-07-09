import feedRepository from "@/db/feed-repository.js";
import friendshipRepository from "@/db/friendship-repository.js";
import likeRepository from "@/db/like-repository.js";
import postRepository from "@/db/post-repository.js";
import friendship from "@/models/friendship.js";
import { loggerPlugin } from "http-proxy-middleware";
import mongoose from "mongoose";

const feedPipeline = [
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
];

class ProfileService {
  async getFeeds() {
    const feeds = await feedRepository.aggregate(feedPipeline);

    if (feeds) {
      return {
        status: 200,
        data: feeds,
      };
    }

    return {
      status: 500,
      message: {
        error: "No feeds found",
      },
    };
  }

  async setLike(userId: string, postId: string) {
    const newLike = await likeRepository.findOne({
      liker: userId,
      post: postId,
    });

    if (!newLike) {
      await likeRepository.create({
        liker: new mongoose.Types.ObjectId(userId),
        post: new mongoose.Types.ObjectId(postId),
      });
    } else {
      await likeRepository.deleteOne({ liker: userId, post: postId });
    }

    const likesCount = await likeRepository.countLikes(postId);
    await postRepository.updateById(postId, {
      $set: {
        likesCount,
      },
    });

    return likesCount;
  }

  async createFriendship(senderId: string, receiverId: string) {
    const friendship = await friendshipRepository.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    if (friendship) {
      return {
        status: 400,
        message: {
          message: "Friend request already sent",
        },
      };
    }

    await friendshipRepository.create({
      sender: new mongoose.Types.ObjectId(senderId),
      receiver: new mongoose.Types.ObjectId(receiverId),
    });

    return {
      status: 200,
      message: {
        message: "Friendship request sent successfully",
      },
    };
  }

  async getFriendshipList(userId: string) {
    const friendshipList = await friendshipRepository.find({
      $and: [
        { $or: [{ sender: userId }, { receiver: userId }] },
        { status: "accepted" },
      ],
    });

    return {
      status: 200,
      data: friendshipList,
    };
  }
}

export default new ProfileService();
