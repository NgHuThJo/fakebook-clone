// Third party
import express from "express";
// Routers
import indexRouter from "./api/index/index.js";
import profileRouter from "./api/profile/profile.js";
import userRouter from "./api/user/user.js";

const router = express.Router();

router.use("/", indexRouter);
router.use("/user", userRouter);
router.use("/profile", profileRouter);

export default router;
