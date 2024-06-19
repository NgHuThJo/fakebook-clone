// Third party
import express from "express";
import request from "supertest";
// Collections
import User from "@/models/user.js";
// Router
import indexRouter from "./index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

describe("post /signup", () => {
  it("should create a new user and return 201 status with the correct data", async () => {
    const res = await request(app).post("/signup").send({
      username: "John Doe",
      email: "john.doe@gmail.com",
      password: "password",
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      emailToken: expect.any(String),
      message: expect.any(String),
    });

    const user = await User.findOne({ email: "john.doe@gmail.com" });
    expect(user).toHaveProperty("email");
  });

  it("should return 400 status for missing fields", async () => {
    const res = await request(app).post("/signup").send({
      username: "John Doe",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should  return 400 status for invalid input", async () => {
    const res = await request(app).post("/signup").send({
      username: "John Doe",
      email: "john.doegmail.com",
      password: "password",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should not allow duplicate email signup", async () => {
    let res = await request(app).post("/signup").send({
      username: "John Doe",
      email: "john.doe@gmail.com",
      password: "password",
    });

    res = await request(app).post("/signup").send({
      username: "John Doe",
      email: "john.doe@gmail.com",
      password: "password",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "This email address is already in use. Please try another email address!"
    );
  });
});

describe("post /login", () => {
  beforeEach(async () => {
    await request(app).post("/signup").send({
      username: "John Doe",
      email: "john.doe@gmail.com",
      password: "password",
    });
  });

  it("should return 200 status with jwt token", async () => {
    const res = await request(app).post("/login").send({
      email: "john.doe@gmail.com",
      password: "password",
    });

    console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should return status code 401", async () => {
    const res = await request(app).post("/login").send({
      username: "Johnny Doe",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
  });
});
