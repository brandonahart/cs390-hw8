import express from "express";

import {BlogModel} from "../schema/blog.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const blogs = await BlogModel.find({});

  return res.send(blogs.map((blog) => blog.toObject()));
});

router.post("/create-post", async (req, res) => {
  const body = req.body;

  //used to check if password is right
  if (body.password !== "Password") 
    return res.sendStatus(500);

  const blog = new BlogModel({content: body.content, title: body.title});
  await blog.save();
  return res.send(blog.toObject());
});

router.delete("/delete-post", async (req, res) => {
  const {title} = req.body;
  await BlogModel.deleteOne({title});

  //Set status to 204 which means "no content"
  res.sendStatus(204);
})


export default router;