import express from "express"
import router from "./router"
import dotenv from "dotenv"
import upload from "express-fileupload"
dotenv.config()
import path from "path"

const PORT = process.env.PORT || 2000
const app = express()

app.use(express.json())
app.use(upload())
app.use("/api", router)
app.use(express.static(path.join(__dirname, "../public")))
app.disable("x-powered-by")
app.listen(PORT, () => {
  console.log(`up and running at port ${PORT}`)
})

export default app
