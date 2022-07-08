import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { client } from "../../../db"

const OnePost = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await client.posts.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        comments: true,
        likes: true,
        profile: true,
      },
    })
    res
      .status(200)
      .json({
        posts: {
          ...data,
          commentCount: data?.comments.length,
          likeCount: data?.likes.length,
        },
      })
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

export default OnePost
