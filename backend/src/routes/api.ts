// Third party
import express from "express";
// Routers
import chatRouter from "./api/chat/chat.js";
import indexRouter from "./api/index/index.js";
import userRouter from "./api/user/user.js";

const router = express.Router();

router.use("/", indexRouter);
router.use("/chat", chatRouter);
router.use("/user", userRouter);

export default router;
