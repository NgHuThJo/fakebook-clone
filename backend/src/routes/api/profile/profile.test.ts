// Third party
import express from "express";
import request from "supertest";
import { vi } from "vitest";
// Collections
import Feed from "@/models/feed.js";
import User from "@/models/user.js";
// Router
import profileRouter from "./profile.js";
import { generateFeed, generateUser } from "@/test/data-generator.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", profileRouter);

describe("get /users", () => {
  beforeAll(async () => {
    await Promise.all(
      Array.from({ length: 5 }, async () => {
        await User.create(generateUser());
      })
    );
  });

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
  beforeAll(async () => {
    await Promise.all(
      Array.from({ length: 5 }, async () => {
        await Feed.create(generateFeed());
      })
    );
  });

  it("should return 200 status with the feed data", async () => {
    const res = await request(app).get("/feeds");

    expect(res.status).toBe(200);
  });

  it("should return 500 status with error message if the database query fails", async () => {
    const querySpy = vi.spyOn(Feed, "find");
    querySpy.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/feeds");
    expect(res.status).toBe(500);

    querySpy.mockRestore();
  });
});
