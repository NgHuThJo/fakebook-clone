import express from "express";
import * as indexController from "../../../controllers/index-controller.js";

const router = express.Router();

router.post("/signup", indexController.postSignup);
router.post("/login", indexController.postLogin);

export default router;
