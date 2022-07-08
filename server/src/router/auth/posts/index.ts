import { Router } from "express";
import createPost from "./create";
import DeltePost from "./deletePost";

import likePost from "./likePost";
import OnePost from "./onePost";
import UpdatePost from "./updatePost";

const post = Router();

post.post("/post/:id", likePost);
post.delete("/post/:id", DeltePost);
post.put("/post/:id", UpdatePost);
post.post("/post", createPost);

post.get("/post/:id", OnePost);

export default post;
