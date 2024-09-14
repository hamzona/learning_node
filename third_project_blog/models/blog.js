const path = require("path");
const fs = require("fs");
const {v4}=require("uuid")

const p = path.join(__dirname, "..", "data", "blogs.json");

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
    const d=new Date();
    console.log(d.getMinutes())
    const blog = {
      id:v4(),
      title: this.title,
      content: this.content,
      date: d.getMinutes(),
    };
    getBlogs((blogs) => {
      blogs.push(blog);
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
};
