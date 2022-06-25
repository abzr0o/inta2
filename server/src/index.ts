import express from "express"
import { client } from "./db"
const PORT = process.env.PORT || 2000
const app = express()

app.use(express.json())
app.disable("x-powered-by")

app.listen(PORT, () => {
  console.log(`up and running at port ${PORT}`)
})
