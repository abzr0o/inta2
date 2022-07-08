import { Request, Response, Router } from "express"
import { client } from "../../db"
import { users } from "../../interface/usersInterface"
import registerSchema from "../../schema/register"
import bcrybt from "bcrypt"
import jwt from "jsonwebtoken"

const router = Router()

router.post("/register", async (req: Request, res: Response) => {
  const body: users = req.body
  try {
    const { email, name, password, confirmPassword }: users =
      await registerSchema.validateAsync(body)
    try {
      const hashedPassword = await bcrybt.hash(password, 12)
      try {
        const user = await client.users.create({
          data: {
            email,
            name,
            password: hashedPassword,
          },
          select: {
            password: false,
            name: true,
            email: true,
            id: true,
            profile: true,
          },
        })
        const token = jwt.sign(user, (process.env as any).TokenSecret, {
          expiresIn: "2h",
        })
        req.session.data = { token,date: Date.now(),userData: user }
        req.session.logedin = true
        res.json({ token, date: Date.now(), userData: user }).status(200).end()

        return
      } catch (err) {
        console.log(err)

        res.status(400).json({ error: "email already used" }).end()
        return
      }

      return
    } catch (err) {
      res.status(500).send({ error: "server error" }).end()
      console.log(err)
      return
    }
  } catch (err: any) {
    res.status(400).json({ error: err }).end()

    return
  }
})

export default router
