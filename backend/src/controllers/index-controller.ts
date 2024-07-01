// Third party
import asyncHandler from "express-async-handler";
import debug from "debug";
import jwt from "jsonwebtoken";
import userService from "@/services/user-service.js";

const logger = debug("chat-app:indexController");
enum Role {
  Guest = "GUEST",
  Admin = "ADMIN",
}

export const postSignup = [
  userService.validateUser(),
  asyncHandler(async (req, res) => {
    const { username, email, password, avatarUrl } = req.body;
    const result = await userService.signupUser(
      username,
      email,
      password,
      avatarUrl
    );

    res.status(result.status).json(result.data);
  }),
];

export const postLogin = [
  asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    if (role === Role.Guest) {
      const guest = await userService.loginGuestUser();
      const token = jwt.sign(guest.data, process.env.JWT_SECRET);

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });
      res.json({
        message: "Guest successfully logged in",
      });
      return;
    }

    const response = await userService.loginUser(email, password);

    if (response.status >= 400) {
      res.status(response.status).json(response.data);
      return;
    }

    const token = jwt.sign(response.data, process.env.JWT_SECRET);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });
    res.status(response.status).send({
      message: "User successfully logged in",
    });
  }),
];
