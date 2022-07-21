import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { client } from "../../db";
import { query } from "../../interface/usersInterface";

const ExplorPost = async (req: Request, res: Response) => {
  let queryResult = null;
  const { num, curser, sort }: query = req.query;
  const sortQuery: any = {};
  if (sort) {
    const str = sort.split(":");
    sortQuery[str[0]] = str[1];
  }

  if (!curser) {
    try {
      queryResult = await client.posts.findMany({
        take: parseInt(num ? num : "5"),
        orderBy: [sort ? sortQuery : null],
        include: {
          profile: true,
          _count: true,
          src: true,
          comments: {
            include: {
              profile: true,
            },
          },
          likes: {
            include: {
              profile: true,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  } else {
    try {
      queryResult = await client.posts.findMany({
        take: parseInt(num ? num : "5"),
        skip: 1,
        orderBy: [sort ? sortQuery : null],
        cursor: { cratedAt: curser },
        include: {
          comments: {
            include: {
              profile: true,
            },
          },
          likes: {
            include: {
              profile: true,
            },
          },
          profile: true,
          _count: true,
          src: true,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }
  if (queryResult?.length && queryResult.length > 0) {
    const lastItem = queryResult[queryResult.length - 1];
    const LastCursor = lastItem.cratedAt;
    const SecondQuery = await client.posts.findMany({
      orderBy: [sort ? sortQuery : null],
      cursor: {
        cratedAt: LastCursor,
      },
    });
    const result = {
      posts: queryResult,
      count: queryResult.length,
      pageInfo: {
        LastCursor: SecondQuery.length > 1 ? LastCursor : null,
        hasnextPage: SecondQuery.length > 1,
      },
    };
    res
      .status(200)

      .json(result);

    return;
  }

  res.status(404).end();
};

export default ExplorPost;
