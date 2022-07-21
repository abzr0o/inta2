import register from "./register";
import { Router } from "express";
import login from "./login";
import ExplorPost from "./explorerPost";
import Activity from "./activity";

const router = Router();
router.get("/v1/posts", ExplorPost);
router.use("/v1", Activity);
router.use("/v1", register);
router.use("/v1", login);

export default router;
