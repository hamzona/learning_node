const path = require("path");
const fs = require("fs");

const databasePath = path.join(__dirname, "..", "data", "products.json");

const Product = require("../models/product");

exports.redirectPage = (req, res) => res.redirect("/products");

exports.getProducts = (req, res) => {
	Product.fetchAll((products) => {
		res.render("index", {
			pageTitle: "Home page",
			path: "/products",
			products,
		});
	});
};

exports.findProduct = (req, res) => {
	const { id } = req.params;
	Product.fetchById(id, (product) => {
		if (!product) {
			const error = { message: "Not found" };
			return res.render("error.ejs", { pageTitle: "Error", path: "", error });
		}

		res.render("product-datails", {
			path: "/products",
			pageTitle: product.title,
			product,
		});
	});
};
