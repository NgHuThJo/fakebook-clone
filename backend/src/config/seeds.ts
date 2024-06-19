// Third party
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
// Custom modules
import { main } from "./mongo-prod-server.js";
import { generateUser } from "@/test/data-generator.js";
// Models
import User from "@/models/user.js";

const seedUsers = async () => {
  await main();

  await User.deleteMany({});
  const users = Array.from({ length: 5 }, generateUser);
  await User.insertMany(users);

  console.log("Fake users saved...");

  mongoose.disconnect();
  process.exit();
};

seedUsers();
