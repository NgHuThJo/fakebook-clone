// // Third party
// import debug from "debug";
// import express from "express";
// import mongoose from "mongoose";
// import request from "supertest";
// // Collections
// import User from "../../../models/user.js";
// // Router
// import userRouter from "./user.js";

// const logger = debug("chat-app:user.test");
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use("/", userRouter);

// const fakeData = [
//   {
//     username: "Johnny Doe",
//     password: "password",
//   },
//   {
//     username: "Jane Doe",
//     password: "password",
//   },
// ];

// describe("user routes", () => {
//   beforeEach(async () => {
//     // Save fake users in data base
//     try {
//       await Promise.all(
//         fakeData.map((userData) => {
//           const newUser = new User(userData);
//           newUser.save();
//         })
//       );
//     } catch (err) {
//       logger(err);
//     }
//   });

//   describe("get /:id", () => {
//     // Happy path

//     // Negative testing
//     it("should return status code 500 because url parameter is invalid", async () => {
//       const response = await request(app).get("/randomId");

//       expect(response.status).toBe(500);
//     });
//   });
// });
