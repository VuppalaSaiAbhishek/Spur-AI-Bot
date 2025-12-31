import { Router } from "express";
import { handleChatAction } from "../controllers/chatController";

const router = Router();

router.post('/message',handleChatAction);

export default router;