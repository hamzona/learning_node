const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4 } = require("uuid");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const productRoutes = require("./routes/products.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");

const errorController = require("./controllers/error.controllers");

app.use(productRoutes);
app.use(adminRoutes);
app.use(cartRoutes);

app.get("*", errorController.get404);
app.listen(5000);
