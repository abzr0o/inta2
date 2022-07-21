import { Request, Response } from "express";
import { client } from "../../../db";
import { query } from "../../../interface/usersInterface";

const trending = async (req: Request, res: Response) => {
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
          _count: true,
          profile: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      queryResult = await client.posts.findMany({
        take: parseInt(num ? num : "5"),
        orderBy: [sort ? sortQuery : null],
        skip: 1,
        cursor: { trendeingScore: parseFloat(curser) },
        include: {
          _count: true,
          profile: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  if (queryResult?.length && queryResult.length > 0) {
    const lastItem = queryResult[queryResult.length - 1];
    const LastCursor = lastItem.trendeingScore;
    const SecondQuery = await client.posts.findMany({
      // take: parseInt(num ? num : "5"),
      orderBy: [sort ? sortQuery : null],
      cursor: {
        trendeingScore: LastCursor ? LastCursor : undefined,
      },
    });
    const result = {
      trending: queryResult,
      count: queryResult.length,
      pageInfo: {
        LastCursor: SecondQuery.length > 1 ? LastCursor : null,
        hasnextPage: SecondQuery.length > 1,
      },
    };
    res.status(200).json(result);
    return;
  } else {
    console.log("hi");

    res.status(404).end();
  }
};

export default trending;
