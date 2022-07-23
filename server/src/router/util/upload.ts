import { Router, Request, Response, NextFunction } from "express";
import path from "path";
import util from "util";
import { client } from "../../db";
import AWS from "aws-sdk";
import { Blob } from "buffer";
import { String } from "aws-sdk/clients/acm";
const router = Router();

router.post(
  "/v1/upload",
  async (req: Request, res: Response, next: NextFunction) => {
    const { URl, type } = req.body;
    // if (type !== "image" && type !== "video") {
    //   res
    //     .status(400)
    //     .json({ error: "only video and images are aceepted" })
    //     .end();
    //   return;
    // }
    // // const URl = "/uploads/" + md5 + extend;
    // // await util.promisify(file.mv)("./public" + URl);

    const data = await client.imgs.create({
      data: {
        imgurl: URl,
        type,
      },
    });
    res.status(200).json({ data }).end();
  }
);
//   res.json({
//     msg: "uploaded",
//     url: URl,
//     id: data.id,
//     type,
//   });
// } catch (err) {
//   try {
//     const data = await client.imgs.findUnique({
//       where: {
//         imgurl: URl,
//       },
//     });
//     res.json({
//       msg: "uploaded",
//       url: URl,
//       id: data?.id,
//       type,
//     });
//   } catch (err) {}
// }

export default router;
