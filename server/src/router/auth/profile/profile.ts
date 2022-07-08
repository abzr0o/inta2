import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { client } from "../../../db";
import { profile } from "../../../interface/usersInterface";

const profileCreate = async (req: Request, res: Response) => {
  const token = req.session.data.token;
  const { username, bio, imgurl }: profile = req.body;
  const data: any = jwt.verify(token, (process.env as any).TokenSecret);
  try {
    const profile = await client.profile.create({
      data: {
        userid: data.id,
        username,
        imgurl,
        bio,
      },
    });

    const newToken = jwt.sign({ profile }, (process.env as any).TokenSecret, {
      expiresIn: "2h",
    });
    res.status(200).json({ token: newToken }).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err }).end();
  }
};
export default profileCreate;
