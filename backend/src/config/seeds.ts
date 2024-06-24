// Third party
import mongoose from "mongoose";
// Custom modules
import { main } from "./mongo-prod-server.js";
import { generateFeed, generateUser } from "@/test/data-generator.js";
// Models
import Feed from "@/models/feed.js";
import User from "@/models/user.js";

const seedUsers = async () => {
  await main();
  await User.deleteMany({});
  await Feed.deleteMany({});
  const users = Array.from({ length: 5 }, generateUser);
  const feeds = Array.from({ length: 5 }, generateFeed);
  await User.insertMany(users);
  await Feed.insertMany(feeds);

  console.log("Fake users saved...");

  mongoose.disconnect();
  process.exit();
};

seedUsers();
