import { Router } from "express";
import cacheMiddleware from "../../../cache/cache";

import GetComments from "../../auth/comments/GetComments";
import OnePost from "../../auth/posts/onePost";
import GetActvity from "./GetActivity";
import trending from "./trendning";

const router = Router();

router.get("/trending", trending);
router.get("/activity", GetActvity);
router.get("/comments", GetComments);
router.get("/post/:id", OnePost);
export default router;
