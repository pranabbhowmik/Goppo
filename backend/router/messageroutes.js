import express from "express";
import {
  getConversationDetails,
  getMessages,
  sendMessage,
} from "../controllers/message.controllers.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

router.get("/conversations/:id", protectRoute, getConversationDetails);
export default router;
