const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const blogsRoutes = require("./routes/blogs.routes");
const adminRoutes=require("./routes/admin.routes")
const commentRoutes=require("./routes/comment.routes")

app.use(blogsRoutes);
app.use(adminRoutes)
app.use(commentRoutes)

app.listen(5000);
