import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers["authorization"]) {
    res.status(401).json({ error: "not allowed" }).end()
  } else {
    const token: any = req.headers["authorization"].split(" ")
    try {
      const verfiy = jwt.verify(token[1], (process.env as any).TokenSecret)
      if (verfiy) {
        next()
      }
    } catch (err) {
      res.status(401).end()
    }
  }
}

export default auth
