const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4 } = require("uuid");

const app = express();

const databasePath = path.join(__dirname, "data", "products.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const productRoutes = require("./routes/products.routes");
const adminRoutes = require("./routes/admin.routes");

app.use(productRoutes);
app.use(adminRoutes);

app.get("*", (req, res) => {
	const error = { message: "Not found" };
	res.render("error.ejs", { pageTitle: "Error", error });
});
app.listen(5000);
