const path = require("path");
const fs = require("fs");
const { v4 } = require("uuid");

const databasePath = path.join(__dirname, "..", "data", "products.json");

const Product = require("../models/product");

exports.addProductPage = (req, res) => {
	res.render("addProdukt", {
		pageTitle: "Add new product",
		title: "Add produkt",
		path: "/admin/addProduct",
	});
};

exports.addProductAction = (req, res) => {
	const { title, price } = req.body;
	const product = new Product(title, price);
	product.save();
	res.redirect("/");
};

exports.adminProducts = (req, res) => {
	Product.fetchAll((products) => {
		res.render("adminProducts", {
			pageTitle: "Add new product",
			path: "/admin/products",
			products: products,
		});
	});
};

exports.adminOrders = (req, res) => {
	res.render("adminOrders", {
		pageTitle: "Admin orders",
		path: "/admin/orders",
	});
};
