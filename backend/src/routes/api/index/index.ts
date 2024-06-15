import express from "express";
import * as indexController from "../../../controllers/indexController.js";

const router = express.Router();

router.post("/signup", indexController.postSignup);
router.post("/login", indexController.postLogin);
router.post("/logout", indexController.postLogout);

export default router;
