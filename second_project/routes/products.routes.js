const express = require("express");
const path = require("path");
const fs = require("fs");

const route = express.Router();

const databasePath = path.join(__dirname, "..", "data", "products.json");

route.get("/", (req, res) => res.redirect("/products"));

route.get("/products", (req, res) => {
	fs.readFile(databasePath, (err, products) => {
		if (err) console.log(err);
		res.render("index", {
			pageTitle: "Home page",
			title: "Home",
			products: JSON.parse(products),
		});
	});
});

route.get("/product/:id", (req, res) => {
	const { id } = req.params;
	fs.readFile(databasePath, (err, products) => {
		if (err) console.log(err.message);
		const product = JSON.parse(products).find((product) => product.id === id);
		const error = { message: "Not found" };
		if (!product) return res.render("error.ejs", { pageTitle: "Error", error });
		res.render("product-datails", { pageTitle: product.title, product });
	});
});

module.exports = route;
