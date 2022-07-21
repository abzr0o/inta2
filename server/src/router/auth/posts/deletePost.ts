import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { cache } from "../../../cache/cache";
import { client } from "../../../db";

const DeltePost = async (req: Request, res: Response) => {
  const { userid }: any = req.query;
  const { id }: any = req.params;

  const token = req.session.data.token;
  const verify: any = jwt.verify(token, (process.env as any).TokenSecret);
  if (req.session.data.userData.userid !== parseInt(userid)) {
    res.status(403).end();
  } else {
    try {
      await client.posts.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.status(204).end();
      cache.flushAll();
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }
};

export default DeltePost;
