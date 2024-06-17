import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { main } from "./mongoConfig.js";
import User from "@/models/user.js";

const createFakeUser = () => {
  return {
    username: faker.person.fullName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };
};

const seedUsers = async () => {
  await main();

  await User.deleteMany({});
  const users = Array.from({ length: 5 }, createFakeUser);
  await User.insertMany(users);

  console.log("Fake users saved...");

  mongoose.disconnect();
  process.exit();
};

seedUsers();
