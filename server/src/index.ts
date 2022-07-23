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
import cors from "cors";
declare module "express-session" {
  interface SessionData {
    data: any;
    logedin?: boolean;
  }
}

const PORT: any = process.env.PORT || 2000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
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
    cookie: {
      secure: false,
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: false,
      path: "/",
    },
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
