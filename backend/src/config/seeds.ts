// Third party
import mongoose from "mongoose";
// Custom modules
import { main } from "./mongo-prod-server.js";
import {
  generateFeed,
  generatePost,
  generateUser,
} from "@/utils/data-generator.js";
// Models
import Feed from "@/models/feed.js";
import User from "@/models/user.js";
import Post from "@/models/post.js";

const seedUsers = async () => {
  const userCount = 5;
  const postCount = 10;
  const feedCount = 5;

  await main();

  await Promise.all([User.deleteMany(), Post.deleteMany(), Feed.deleteMany()]);

  const users = Array.from({ length: userCount }, generateUser);
  await User.insertMany(users);
  const userIds: mongoose.Types.ObjectId[] = await User.find({}, "_id");

  const posts = Array.from({ length: postCount }, () =>
    generatePost(userIds[Math.floor(Math.random() * userCount)])
  );
  await Post.insertMany(posts);
  const postIds: mongoose.Types.ObjectId[] = await Post.find({}, "_id");

  const feeds = Array.from({ length: feedCount }, (feed, index) =>
    generateFeed(postIds[index])
  );
  await Feed.insertMany(feeds);

  console.log("Fake users saved...");

  mongoose.disconnect();
  process.exit();
};

seedUsers();
