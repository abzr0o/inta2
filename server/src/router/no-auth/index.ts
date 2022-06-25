import register from "./register"
import { Router } from "express"

const router = Router()

router.use("/v1", register)

export default router
