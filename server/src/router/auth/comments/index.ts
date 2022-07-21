import { Router } from "express";
import createComment from "./createComments";
import deleteComment from "./deleteComment";

const router = Router();
router.post("/comment", createComment);
router.delete("/comment/:id", deleteComment);
export default router;
