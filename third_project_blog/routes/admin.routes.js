const path = require("path");
const fs = require("fs");

const route = require("express").Router();

const p = path.join(__dirname, "..", "data", "blogs.json");

const Blog = require("../models/blog");

route.get("/admin/postBlog", (req, res) => {
  res.render("postBlog", { pageTitle: "Post blog" });
});

route.post("/admin/postBlog", (req, res) => {
  const { title, content } = req.body;
  const blog = new Blog(title, content);
  blog.save();
  res.redirect("/blogs");
});

module.exports = route;
