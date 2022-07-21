import { Request, Response } from "express";
import { client } from "../../../db";

const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userid, postid }: any = req.query;
  if (req.session.data.userData.id !== parseInt(userid)) {
    res.status(403).end();
  } else {
    try {
      await client.comments.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.status(204).end();
    } catch (err) {
      console.log(err);
    }
  }
};

export default deleteComment;
