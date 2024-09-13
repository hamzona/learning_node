const route = require("express").Router();

route.get("/", (req, res) => res.redirect("/blogs"));

const Blog = require("../models/blog");
const Comment = require("../models/comment")

route.get("/blogs", (req, res) => {
  Blog.fetchAll((blogs) => {
    res.render("home", { pageTitle: "Home page", blogs });
  });
});

route.get("/blog/:id", (req, res) => {
  const { id } = req.params
  Blog.fetchById(id, blog => {
    Comment.fetchById(id, (comments) => {
      res.render("datails", { pageTitle: "Datails", blog, comments })

    })
  })
})

module.exports = route;
