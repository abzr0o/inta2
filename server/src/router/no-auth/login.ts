import { Request, Response, Router } from "express";
import { login } from "../../interface/usersInterface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { client } from "../../db";

const login = Router();

login.post("/login", async (req: Request, res: Response) => {
  const { email, password }: login = req.body;
  try {
    const user = await client.profile.findFirst({
      where: {
        users: { email: { equals: email } },
      },
      include: {
        users: {
          select: {
            password: true,
            name: true,
          },
        },
      },
    });

    if (user) {
      try {
        const correctPassword = await bcrypt.compare(
          password,
          user?.users?.password as any
        );
        if (correctPassword) {
          const token = jwt.sign(
            {
              name: user?.users?.name,
              email,
              id: user?.id,
              username: user.username,
              userid: user.userid,
            },
            (process.env as any).TokenSecret,
            { expiresIn: "2h" }
          );
          req.session.data = {
            token,
            date: Date.now(),
            userData: {
              name: user?.users?.name,
              id: user?.id,
              email,
              username: user.username,
              userid: user.userid,
            },
          };
          req.session.logedin = true;
          res.status(200).json({
            token,
            date: Date.now(),
            userData: {
              name: user?.users?.name,
              id: user?.id,
              email,
              username: user.username,
              userid: user.userid,
            },
          });
        } else {
          res
            .status(400)
            .json({ error: "password or email in not correct" })
            .end();
        }
      } catch (err) {}
    } else {
      res.status(400).json({ error: "email is not found" }).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err }).end();
  }
});

export default login;
