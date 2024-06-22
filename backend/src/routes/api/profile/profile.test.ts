// Third party
import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { vi } from "vitest";
// Collections
import { Feed, Post, User } from "@/models/index.js";
// Router
import profileRouter from "./profile.js";
import {
  generateFeed,
  generatePost,
  generateUser,
} from "@/test/data-generator.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", profileRouter);

const setupData = async () => {
  const userCount = 5;
  const postCount = 10;
  const feedCount = 5;

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
};

describe("get /users", () => {
  beforeAll(setupData);

  it("should return 200 status with the user data", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
  });

  it("should return 500 status with error message if the database query fails", async () => {
    const querySpy = vi.spyOn(User, "find");
    querySpy.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/users");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");

    querySpy.mockRestore();
  });
});

describe("get /feeds", () => {
  it("should return 200 status with the feed data", async () => {
    const res = await request(app).get("/feeds");

    expect(res.status).toBe(200);
  });

  it("should return 500 status with error message if the database query fails", async () => {
    const querySpy = vi.spyOn(Feed, "aggregate");

    querySpy.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/feeds");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");

    querySpy.mockRestore();
  });
});
