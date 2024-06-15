// Third party
import debug from "debug";
import express from "express";
import mongoose from "mongoose";
import request from "supertest";
// Collections
import User from "../../../models/user.js";
// Router
import chatRouter from "./chat.js";

const logger = debug("chat-app:chat.test");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", chatRouter);

const fakeData = [
  {
    username: "Johnny Doe",
    password: "password",
  },
  {
    username: "Jane Doe",
    password: "password",
  },
];

describe("chat routes", () => {
  beforeEach(async () => {
    // Save fake users in data base
    try {
      await Promise.all(
        fakeData.map((userData) => {
          const newUser = new User(userData);
          newUser.save();
        })
      );
    } catch (err) {
      logger(err);
    }
  });

  describe("get /", () => {
    // Happy path
    it("should return status code 200", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });

    // Negative testing
  });
});
