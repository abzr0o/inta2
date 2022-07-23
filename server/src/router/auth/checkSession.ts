import { Request, Response } from "express";
import { client } from "../../db";

const checkSession = async (req: Request, res: Response) => {
  const data = await client.profile.findUnique({
    where: { userid: req.session.data.userData.userid },
  });
  res.status(200).json({ user: data }).end();
};

export default checkSession;
