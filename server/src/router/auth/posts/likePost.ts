import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { client } from "../../../db";

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
          datepost: new Date(),
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
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export default likePost;
