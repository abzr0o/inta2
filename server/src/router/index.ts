import { Router } from "express"
import upload from "./util/upload"
import notAuth from "./no-auth"
const router = Router()

router.use(notAuth)
router.use(upload)

export default router
