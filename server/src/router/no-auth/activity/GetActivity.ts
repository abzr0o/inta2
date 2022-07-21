import { Request, Response } from "express";
import { client } from "../../../db";
import { query } from "../../../interface/usersInterface";

const GetActvity = async (req: Request, res: Response) => {
  let queryResult = null;

  const { num, curser, sort }: query = req.query;
  const sortQuery: any = {};
  if (sort) {
    const str = sort.split(":");
    sortQuery[str[0]] = str[1];
  }
  if (!curser) {
    try {
      queryResult = await client.activity.findMany({
        take: parseInt(num ? num : "5"),
        orderBy: [sort ? sortQuery : null],
        include: {
          post: {
            include: {
              _count: true,
            },
          },
          profile: {
            include: {
              _count: true,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      queryResult = await client.activity.findMany({
        take: parseInt(num ? num : "5"),
        orderBy: [sort ? sortQuery : null],
        skip: 1,
        cursor: { Date: curser },
        include: {
          post: {
            include: {
              _count: true,
            },
          },
          profile: {
            include: {
              _count: true,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  if (queryResult?.length && queryResult.length > 0) {
    const lastItem = queryResult[queryResult.length - 1];
    const LastCursor = lastItem.Date;
    const SecondQuery = await client.activity.findMany({
      orderBy: [sort ? sortQuery : null],
      cursor: {
        Date: LastCursor,
      },
    });
    const result = {
      activty: queryResult,
      count: queryResult.length,
      pageInfo: {
        LastCursor: SecondQuery.length > 1 ? LastCursor : null,
        hasnextPage: SecondQuery.length > 1,
      },
    };
    res.status(200).json(result);
    return;
  }
  res.status(404).end();
};

export default GetActvity;
