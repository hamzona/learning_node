const route = require("express").Router();

route.get("/", (req, res) => res.redirect("/blogs"));

const Blog = require("../models/blog");

route.get("/blogs", (req, res) => {
  Blog.fetchAll((blogs) => {
    res.render("home", { pageTitle: "Home page", blogs });
  });
});

module.exports = route;
