import { Router } from "express"
import upload from "./util/upload"
import notAuth from "./no-auth"
import auth from "./util/auth"
import authRout from "./auth/inedx"
const router = Router()

router.use(notAuth)
router.use(auth, upload)
router.use(auth, authRout)

export default router
