import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSideber } from "../controllers/user.controllers.js";

const router = express.Router();
router.get("/", protectRoute, getUsersForSideber);

export default router;
