// Third party
import bcryptjs from "bcryptjs";
import debug from "debug";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import request from "supertest";
// Collections
import User from "../../../models/user.js";
// Router
import indexRouter from "./index.js";
// Custom code
import { setupLocalStrategy } from "../../../services/authentication/passport.js";

const logger = debug("chat-app:index.test");
const app = express();
const saltLength = 10;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

setupLocalStrategy();
app.use(
  session({
    secret: "catsanddogs",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.session());

app.use("/", indexRouter);

// Mock user data
const fakeData = [
  {
    username: "Johnny Doe",
    password: await bcryptjs.hash("password", saltLength),
  },
  {
    username: "Jane Doe",
    password: await bcryptjs.hash("password", saltLength),
  },
];

describe("index routes", () => {
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

  describe("post /signup", () => {
    it("should return status code 200", async () => {
      const response = await request(app).post("/signup").send({
        username: "Johnnie Doe",
        password: "password",
      });

      expect(response.status).toBe(200);
    });

    it("should return status code 400 because password is too short", async () => {
      const response = await request(app).post("/signup").send({
        username: "Johnnie Doe",
        password: "sho",
      });

      expect(response.status).toBe(400);
    });
  });

  describe("post /login", () => {
    it("should return status code 200", async () => {
      const response = await request(app).post("/login").send({
        username: "Johnny Doe",
        password: "password",
      });

      expect(response.status).toBe(200);
    });

    it("should return status code 401", async () => {
      const response = await request(app).post("/login").send({
        username: "Johnny Doe",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
    });
  });
});
