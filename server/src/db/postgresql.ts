import pg from "pg"

const client = new pg.Client({
  host: "localhost",
  database: "insta2",
  port: 5432,
  user: "postgres",
  password: "QWsazxc12e",
})
const connect = async () => {
  try {
    await client.connect()
    console.log("connected")
  } catch (err) {
    console.log(err)
  }
}

connect()

export default client
