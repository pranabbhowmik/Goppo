import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUserById,
  getUsersForSideber,
} from "../controllers/user.controllers.js";

const router = express.Router();
router.get("/", protectRoute, getUsersForSideber);
router.get("/:id", protectRoute, getUserById);
export default router;
