import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { client } from "../../db"
const auth =async  (req: Request, res: Response, next: NextFunction) => {
  
  if (!req.session.logedin ) {
    res.status(401).json({ error: "not allowed" }).end()
  } else {
        next()   
  }
}

export default auth
