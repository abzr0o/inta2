import { NextFunction, Request, Response } from "express";
import nodeCache from "node-cache";

const cache = new nodeCache();

const cacheMiddleware =
  (duration: number) => (req: Request, res: any, next: NextFunction) => {
    if (req.method !== "GET") {
      return next();
    }
    const key = req.originalUrl;
    const cachedResponse: any = cache.get(key);
    if (cachedResponse) {
      console.log(`cache hit for ${key}`);
      const data = JSON.parse(cachedResponse);
      res.json(data);
    } else {
      console.log(`cache miss for ${key}`);
      res.originalSend = res.send;
      res.send = (body: any) => {
        res.originalSend(body);
        cache.set(key, body, duration);
      };
      next();
    }
  };
export default cacheMiddleware;
export { cache };
