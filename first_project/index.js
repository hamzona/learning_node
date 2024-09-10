const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  let dataPath = path.join(__dirname, "data", "users.json");
  let userData = [];
  fs.readFile(dataPath, (err, users) => {
    let newUsers = JSON.parse(users);
    userData = [...newUsers, { username, password }];

    fs.writeFile(dataPath, JSON.stringify(userData), () => {
      res.redirect("/signup");
    });
  });
});
app.listen(5000);
