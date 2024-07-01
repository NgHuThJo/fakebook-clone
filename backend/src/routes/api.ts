// Third party
import express from "express";
// Models
import "@/models";
import { verifyJWT } from "@/utils/jwt.js";
// Routers
import indexRouter from "./api/index/index.js";
import profileRouter from "./api/profile/profile.js";

const router = express.Router();

router.use("/", indexRouter);
router.use("/profile", verifyJWT, profileRouter);

export default router;
