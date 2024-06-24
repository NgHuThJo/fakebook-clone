// Third party
import express from "express";
// Routers
import indexRouter from "./api/index/index.js";
import profileRouter from "./api/profile/profile.js";

const router = express.Router();

router.use("/", indexRouter);
router.use("/profile", profileRouter);

export default router;
