import feed from "@/models/feed.js";
import friendship from "@/models/friendship.js";
import like from "@/models/like.js";
import post from "@/models/post.js";
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

const friendshipPipeline = async (userId: string) => {
  const friendList = await friendship.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              { sender: new mongoose.Types.ObjectId(userId) },
              { receiver: new mongoose.Types.ObjectId(userId) },
            ],
          },
          {
            status: { $ne: "rejected" },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        let: { sender: "$sender", receiver: "$receiver" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $or: [
                      { $eq: ["$_id", "$$sender"] },
                      { $eq: ["$_id", "$$receiver"] },
                    ],
                  },
                  {
                    $ne: ["$_id", new mongoose.Types.ObjectId(userId)],
                  },
                ],
              },
            },
          },
          {
            $project: {
              username: 1,
              email: 1,
              avatarUrl: 1,
            },
          },
        ],
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $group: {
        _id: "$status",
        friends: { $push: "$userDetails" },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        friends: 1,
      },
    },
  ]);

  console.log("Friendlist", friendList);

  return friendList;
};

class ProfileService {
  async getFeeds() {
    const feeds = await feed.aggregate(feedPipeline);

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
    const newLike = await like.findOne({
      liker: userId,
      post: postId,
    });

    if (!newLike) {
      await like.create({
        liker: new mongoose.Types.ObjectId(userId),
        post: new mongoose.Types.ObjectId(postId),
      });
    } else {
      await like.deleteOne({ liker: userId, post: postId });
    }

    const likesCount = await like.countDocuments({ post: postId });
    await post.findByIdAndUpdate(postId, {
      $set: {
        likesCount,
      },
    });

    return likesCount;
  }

  async createFriendship(senderId: string, receiverId: string) {
    if (senderId === receiverId) {
      return {
        status: 400,
        message: {
          message: "You can't send a friend request to yourself",
        },
      };
    }

    const friendshipObject = await friendship.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    if (friendshipObject) {
      return {
        status: 400,
        message: {
          message: "Friend request already sent",
        },
      };
    }

    await friendship.create({
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
    const friendshipList = await friendshipPipeline(userId);

    return {
      status: 200,
      data: friendshipList,
    };
  }

  async acceptFriendRequest(userId: string, senderId: string) {
    console.log("User id", userId, "Sender id", senderId);

    // await friendship.updateOne();
  }
}

export default new ProfileService();
