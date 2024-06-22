// Third party
import express, { query } from "express";
import request from "supertest";
import { vi } from "vitest";
// Collections
import User from "@/models/user.js";
// Router
import profileRouter from "./profile.js";
import { generateUser } from "@/test/data-generator.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", profileRouter);

describe("get /", () => {
  beforeAll(async () => {
    await Promise.all(
      Array.from({ length: 5 }, async () => {
        await User.create(generateUser());
      })
    );
  });

  it("should return 200 status with the user data", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body).not.toBeUndefined();
  });

  it("should return 500 status with error message if the database query fails", async () => {
    const querySpy = vi.spyOn(User, "find");
    querySpy.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/");
    expect(res.status).toBe(500);

    querySpy.mockRestore();
  });
});
