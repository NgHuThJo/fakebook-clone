import express, { response } from "express";
import * as profileController from "@/controllers/profile-controller.js";

const router = express.Router();

router.get("/users", profileController.getUsers);
router.get("/feeds", profileController.getFeeds);
router.post("/likes", profileController.postLike);
router.get("/friends", profileController.getFriendship);
router.post("/friends", profileController.postFriendship);

export default router;
