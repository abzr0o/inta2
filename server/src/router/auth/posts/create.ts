import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { cache } from "../../../cache/cache";
import { client } from "../../../db";
import ranking from "../../../utils/rankingFun";
import { updateTrend } from "../../../utils/trendtimer";

const createPost = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const img = await client.imgs.findUnique({
      where: {
        imgurl: body.src,
      },
    });
    const post = await client.posts.create({
      data: {
        src: {
          connect: {
            id: img?.id,
          },
        },
        profile: {
          connect: {
            id: req.session.data.userData.id,
          },
        },
        datepost: new Date(),
        body: body.body,
        likes: {
          create: {
            profileid: req.session.data.userData.id,
          },
        },
      },
      include: {
        profile: true,
        src: true,
        comments: true,
        likes: true,
        _count: true,
      },
    });
    res
      .status(200)
      .json({
        post: {
          ...post,
        },
      })
      .end();
    updateTrend();
    cache.flushAll();
    try {
      await client.activity.create({
        data: {
          postId: post.id,
          profileID: req.session.data.userData.id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export default createPost;
