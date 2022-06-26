import { Request, Response, Router } from "express"
import { login } from "../../interface/usersInterface"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { client } from "../../db"

const login = Router()

login.post("/login", async (req: Request, res: Response) => {
  const { email, password }: login = req.body
  try {
    const user = await client.users.findFirst({
      where: {
        email,
      },
    })
    
    try {
      const correctPassword = await bcrypt.compare(
        password,
        user?.password as any
      )
      if (correctPassword) {
        const token = jwt.sign(
          { name: user?.name, email, id: user?.id },
          (process.env as any).TokenSecret,
          { expiresIn: "2h" }
        )
        res.status(200).json({
          token,
          date: Date.now(),
          userData: { name: user?.name, id: user?.id, email },
        })
      } else {
        res
          .status(400)
          .json({ error: "password or email in not correct" })
          .end()
      }
    } catch (err) {}
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err }).end()
  }
})

export default login
