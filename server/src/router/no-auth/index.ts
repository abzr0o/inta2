import register from "./register"
import { Router } from "express"
import login from "./login"

const router = Router()

router.use("/v1", register)
router.use("/v1", login)

export default router
