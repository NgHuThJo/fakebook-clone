// Third party
import express from "express";
// Routers
import indexRouter from "./api/index/index.js";
import userRouter from "./api/user/user.js";

const router = express.Router();

router.use("/", indexRouter);
router.use("/user", userRouter);

export default router;
