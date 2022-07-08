import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { client } from "../../../db";

const createPost = async (req: Request, res: Response) => {
  const body = req.body;

  const token = req.session.data.token;

  try {
    const data: any = jwt.verify(token, (process.env as any).TokenSecret);
    const post = await client.posts.create({
      data: {
        profileid: data.id,
        src: body.src,
        datepost: new Date(),
        body: body.body,
      },
      include: {
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
