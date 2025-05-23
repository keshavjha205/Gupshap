import { getMessages, getUsersFroSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import express from 'express';


const router = express.Router();

router.get("/users", protectRoute, getUsersFroSidebar);
router.get("/:id", protectRoute, getMessages); 

router.post("/send/:id", protectRoute, sendMessage);

export default router;