import { Request, Response } from "express";
import { client } from "../../../db";

const GetComments = async (req: Request, res: Response) => {
  let queryResult = null;
  const { PostId, num, curser, sort }: any = req.query;

  const sortQuery: any = {};
  if (sort) {
    const str = sort.split(":");
    sortQuery[str[0]] = str[1];
  }
  const postid = parseInt(PostId);
  if (postid) {
    if (!curser) {
      queryResult = await client.comments.findMany({
        take: parseInt(num ? num : "5"),
        orderBy: [sort ? sortQuery : null],
        include: {
          profile: true,
        },
        where: {
          postid,
        },
      });
    } else {
      queryResult = await client.comments.findMany({
        take: parseInt(num ? num : "5"),
        orderBy: [sort ? sortQuery : null],
        cursor: { datepost: curser },
        include: {
          profile: true,
        },
        where: {
          postid,
        },
      });
    }
    if (queryResult?.length && queryResult.length > 0) {
      const lastItem = queryResult[queryResult.length - 1];
      const LastCursor = lastItem.datepost;
      const SecondQuery = await client.comments.findMany({
        orderBy: [sort ? sortQuery : null],
        where: {
          postid,
        },
        include: {
          profile: true,
        },
        cursor: {
          datepost: LastCursor,
        },
      });
      const result = {
        comments: queryResult,
        count: queryResult.length,
        pageInfo: {
          LastCursor: SecondQuery.length > 1 ? LastCursor : null,
          hasnextPage: SecondQuery.length > 1,
        },
      };
      res.status(200).json(result).end();
      return;
    }
  }
  res.status(404).end();
};
export default GetComments;
