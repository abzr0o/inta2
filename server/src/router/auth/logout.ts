import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy(() => {});
    res.status(204).end();
  } catch (err) {
    res.status(500).end();
  }
};

export default logout;
