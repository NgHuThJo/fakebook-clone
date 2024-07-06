import feedRepository from "@/db/feed-repository.js";
import likeRepository from "@/db/like-repository.js";
import postRepository from "@/db/post-repository.js";
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
}

export default new ProfileService();
