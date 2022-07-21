import { Router, Request, Response, NextFunction } from "express";
import path from "path";
import util from "util";
import { client } from "../../db";

const router = Router();

router.post(
  "/v1/upload",
  async (req: Request, res: Response, next: NextFunction) => {
    const file: any = req.files?.file;

    if (file.length === 1 || file.length === undefined) {
      try {
        const name = file.name;
        const size = file.size;
        const extend = path.extname(name);

        const md5 = file.md5;

        const type = file.mimetype.split("/")[0];

        if (type !== "image" && type !== "video") {
          res
            .status(400)
            .json({ error: "only video and images are aceepted" })
            .end();
          return;
        }
        const URl = "/uploads/" + md5 + extend;
        await util.promisify(file.mv)("./public" + URl);
        try {
          const data = await client.imgs.create({
            data: {
              imgurl: URl,
              type,
            },
          });
          res.json({
            msg: "uploaded",
            url: URl,
            id: data.id,
            type,
          });
        } catch (err) {
          try {
            const data = await client.imgs.findUnique({
              where: {
                imgurl: URl,
              },
            });
            res.json({
              msg: "uploaded",
              url: URl,
              id: data?.id,
              type,
            });
          } catch (err) {}
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const urlArr = file.map((f: any) => {
        try {
          const name = f.name;
          const size = f.size;
          const extend = path.extname(name);
          const type = f.mimetype.split("/")[0];
          if (type !== "image" && type !== "video") {
            return null;
          }
          const md5 = f.md5;
          const URl = "/uploads/" + md5 + extend;
          util.promisify(f.mv)("./public" + URl);
          return { URl, type };
        } catch (err) {
          console.log(err);
          // res.status(400).json({ error: err }).end();
        }
      });

      res.status(200).json({ urls: urlArr }).end();
      urlArr.forEach(async (uri: any) => {
        try {
          await client.imgs.create({
            data: {
              imgurl: uri.URl,
              type: uri.type,
            },
          });
        } catch (err) {}
      });
    }
  }
);

export default router;
