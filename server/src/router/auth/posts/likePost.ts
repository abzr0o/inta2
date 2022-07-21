import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { cache } from "../../../cache/cache";
import { client } from "../../../db";
import ranking from "../../../utils/rankingFun";

const likePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userid = req.session.data.userData.userid;
  try {
    const isLiked = await client.likes.findMany({
      where: {
        AND: [
          {
            profileid: { equals: userid },
          },
          {
            postid: {
              equals: parseInt(id),
            },
          },
        ],
      },
    });

    if (isLiked.length === 0) {
      const data = await client.likes.create({
        data: {
          profileid: userid,
          postid: parseInt(id),
        },
      });

      res.status(204).end();
    } else {
      const data = await client.likes.deleteMany({
        where: {
          AND: [
            {
              profileid: { equals: userid },
            },
            {
              postid: {
                equals: parseInt(id),
              },
            },
          ],
        },
      });

      res.status(204).end();
    }
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
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export default likePost;
