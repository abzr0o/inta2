import express from "express";
import router from "./router";
import dotenv from "dotenv";
import upload from "express-fileupload";
dotenv.config();
import path from "path";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import updateTrendTimer from "./utils/trendtimer";
import helmet from "helmet";

declare module "express-session" {
  interface SessionData {
    data: any;
    logedin?: boolean;
  }
}

const PORT: any = process.env.PORT || 2000;
const app = express();
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Pass to next layer of middleware
  next();
});
app.use(
  session({
    secret: "hot dog",
    resave: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 },
  })
);
app.use(express.json());
app.use(upload());
app.use("/api", router);
app.use(express.static(path.join(__dirname, "../public")));
app.disable("x-powered-by");
app.listen(PORT, () => {
  console.log(`up and running at port ${PORT}`);
  updateTrendTimer();
});

export default app;
