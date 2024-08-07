// Third party
import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { vi } from "vitest";
// Collections
import { Feed, Like, Post, User } from "@/models/index.js";
// Router
import profileRouter from "./profile.js";
import {
  generateFeed,
  generatePost,
  generateUser,
} from "@/utils/data-generator.js";

const app = express();

const objectId = new mongoose.Types.ObjectId();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.user = {
    _id: objectId,
    username: "Guestname",
    email: "guestemail@gmail.com",
    password: "somerandompassword",
    avatarUrl: "somerandomurl",
    isVerified: true,
  };

  next();
});
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

  return { userIds, postIds };
};

let ids = {};

beforeAll(async () => {
  ids = await setupData();
});

describe("get /users", () => {
  it("should return 200 status with the user data", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
  });

  it("should return 500 status with error message if the database query fails", async () => {
    const querySpy = vi.spyOn(User, "find");
    querySpy.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/users");
    expect(res.status).toBe(500);

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

describe("post /likes", () => {
  it("should return 200 status with the new like count", async () => {
    const res = await request(app).post("/likes").send({
      postId: ids.postIds[0]._id,
    });

    expect(res.status).toBe(200);
    expect(res.body.likesCount).toBe(1);
  });

  it("should return 400 status when no postId is provided", async () => {
    const res = await request(app).post("/likes").send({});

    expect(res.status).toBe(400);
  });

  it("should return 500 status on database error", async () => {
    const querySpy = vi.spyOn(Like, "findOne");

    querySpy.mockRejectedValue(new Error("Database error"));

    const res = await request(app).post("/likes").send({
      postId: ids.postIds[0]._id,
    });

    expect(res.status).toBe(500);
  });
});

describe("post /friends", () => {
  it("should return 200 status after creating friendship request", async () => {
    const res = await request(app).post("/friends").send({
      receiverId: ids.userIds[0]._id,
    });

    expect(res.status).toBe(200);
  });

  it("should not allow duplicate friendship requests", async () => {
    let res = await request(app).post("/friends").send({
      receiverId: ids.userIds[0]._id,
    });

    res = await request(app).post("/friends").send({
      receiverId: ids.userIds[0]._id,
    });

    expect(res.status).toBe(400);
  });
});

describe("get /friends", () => {
  it("should return 200 status after getting the friendship list", async () => {
    const res = await request(app).get("/friends");

    console.log(res.body);

    expect(res.status).toBe(200);
  });
});
