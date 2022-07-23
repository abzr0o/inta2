import { Router } from "express";
import logout from "./logout";
import post from "./posts";
import profileCreate from "./profile/profile";
import comment from "./comments";
import checkSession from "./checkSession";
const authRout = Router();

authRout.use("/v1", post);
authRout.use("/v1", comment);
authRout.post("/v1/profile/create", profileCreate);
authRout.get("/v1/logout", logout);
authRout.get("/v1/check", checkSession);

export default authRout;
