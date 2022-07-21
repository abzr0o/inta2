import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { cache } from "../../../cache/cache";
import { client } from "../../../db";

const UpdatePost = async (req: Request, res: Response) => {
  const { userid }: any = req.query;
  const { id } = req.params;
  const { body, src } = req.body;

  const token = req.session.data.token;
  const verify: any = jwt.verify(token, (process.env as any).TokenSecret);
  if (verify.id !== parseInt(userid)) {
    res.status(403).end();
  } else {
    try {
      await client.posts.update({
        data: {
          body,
          src,
        },
        where: {
          id: parseInt(id),
        },
      });
      cache.flushAll();
      res.status(204).end();
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }
};

export default UpdatePost;
