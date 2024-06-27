import express from "express";
import * as profileController from "@/controllers/profile-controller.js";

const router = express.Router();

router.get("/users", profileController.getUsers);
router.get("/feeds", profileController.getFeeds);
router.post("/likes", profileController.postLike);

export default router;
