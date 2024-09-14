const path = require("path");
const fs = require("fs");
const { v4 } = require("uuid");

const p = path.join(__dirname, "..", "data", "blogs.json");

const Comment = require("../models/comment");

const getBlogs = (cb) => {
  fs.readFile(p, (err, blogs) => {
    cb(JSON.parse(blogs));
  });
};

module.exports = class Blog {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
  save() {
    const blog = {
      id: v4(),
      title: this.title,
      content: this.content,
    };
    //    Comment.createDefaultComment(blog.id)
    getBlogs((blogs) => {
      blogs.unshift(blog);
      fs.writeFile(p, JSON.stringify(blogs), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
  static fetchAll(cb) {
    getBlogs(cb);
  }
  static fetchById(id, cb) {
    getBlogs((blogs) => {
      cb(blogs.find((blog) => blog.id === id));
    });
  }
};
