import { Router, Request, Response } from "express"
import path from "path"
import util from "util"
import { client } from "../../db"

const router = Router()

router.post("/v1/upload", async (req: Request, res: Response) => {
  const file: any = req.files?.file

  if (file.length === 1 || file.length === undefined) {
    try {
      const name = file.name
      const size = file.size
      const extend = path.extname(name)

      const md5 = file.md5
      const URl = "/uploads/" + md5 + extend
      await util.promisify(file.mv)("./public" + URl)

      try {
        const data = await client.imgs.create({
          data: {
            imgurl: URl,
          },
        })
        res.json({
          msg: "uploaded",
          url: URl,
          id: data.id,
        })
      } catch (err) {
        try {
          const data = await client.imgs.findUnique({
            where: {
              imgurl: URl,
            },
          })
          res.json({
            msg: "uploaded",
            url: URl,
            id: data?.id,
          })
        } catch (err) {}
      }
    } catch (err) {
      console.log(err)
    }
  } else {
    const urlArr = file.map((f: any) => {
      try {
        const name = f.name
        const size = f.size
        const extend = path.extname(name)

        const md5 = f.md5
        const URl = "/uploads/" + md5 + extend
        util.promisify(f.mv)("./public" + URl)
        return URl
      } catch (err) {
        console.log(err)
      }
    })

    res.status(200).json({ urls: urlArr }).end()
    urlArr.forEach(async (uri: string) => {
      try {
        await client.imgs.create({
          data: {
            imgurl: uri,
          },
        })
      } catch (err) {}
    })
  }
})

export default router
