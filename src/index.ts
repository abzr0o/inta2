import express, { Request, Response } from "express"

const PORT = process.env.PORT || 2000
const app = express()

app.get("/", (req: Request, res: Response) => {
  res.send("hi")
})

app.listen(PORT, () => {
  console.log(`up and running at port ${PORT}`)
})
