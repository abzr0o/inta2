import supertest from "supertest"
import app from "../src/index"
import { expect } from "chai"
const data = {
  username: "test",
  password: "test",
  email: "s",
}
describe("testing v1", () => {
  describe("test endpoint v1/register post", () => {
    it("respon code 200 when send full data", (done) => {
      supertest(app)
        .post("/v1/register")
        .send(data)
        .expect(200, (err, res) => {
          expect(res.body).to.have.key("token")
          done()
        })
    })
  })
})
