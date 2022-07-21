import { cache } from "../cache/cache";
import { client } from "../db";
import ranking from "./rankingFun";

const updateTrend = async () => {
  console.log("start updateing the trend");
  try {
    const posts = await client.posts.findMany({
      orderBy: {
        trendeingScore: "desc",
      },
      include: {
        _count: true,
      },
    });
    posts.forEach(async (post) => {
      const rank = ranking(
        post._count.likes,
        post._count.comments,
        post.cratedAt
      );
      await client.posts.update({
        data: {
          trendeingScore: rank,
        },
        where: {
          id: post.id,
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
};
const updateTrendTimer = () => {
  const now = new Date();
  const delay = 60 * 60 * 1000; // 1 hour in msec
  const start =
    delay -
    (now.getMinutes() * 60 + now.getSeconds()) * 1000 +
    now.getMilliseconds();

  setTimeout(function doSomething() {
    // do the operation
    // ... your code here...
    cache.flushAll();
    updateTrend();
    // schedule the next tick
    setTimeout(doSomething, delay);
  }, start);
};
export { updateTrend };
export default updateTrendTimer;
