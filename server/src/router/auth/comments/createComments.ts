import { Request, Response } from "express";
import { cache } from "../../../cache/cache";
import { client } from "../../../db";
import ranking from "../../../utils/rankingFun";

const createComment = async (req: Request, res: Response) => {
  const { msg } = req.body;
  const { id }: any = req.query;
  const postid = parseInt(id);
  if (id) {
    try {
      await client.comments.create({
        data: {
          msg,
          profileid: req.session.data.userData.id,
          postid,
        },
      });
      cache.flushAll();
      try {
        const post = await client.posts.findUnique({
          where: {
            id: parseInt(id),
          },
          include: {
            _count: true,
          },
        });
        const rank = ranking(
          post?._count.likes,
          post?._count.comments,
          post?.cratedAt
        );
        await client.posts.update({
          where: {
            id: parseInt(id),
          },
          data: {
            trendeingScore: rank,
          },
        });
      } catch (err) {
        console.log(err);
      }
      res.status(204).end();
    } catch (err) {
      console.log(err);
    }
  }
};

export default createComment;
