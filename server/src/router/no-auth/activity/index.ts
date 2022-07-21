import { Router } from "express";
import cacheMiddleware from "../../../cache/cache";

import GetComments from "../../auth/comments/GetComments";
import GetActvity from "./GetActivity";
import trending from "./trendning";

const router = Router();

router.get("/activity", cacheMiddleware(3600), GetActvity);
router.get("/comments", GetComments);
router.get("/trending", cacheMiddleware(3600), trending);
export default router;
