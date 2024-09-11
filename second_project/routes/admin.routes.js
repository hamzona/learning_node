const path = require("path");
const fs = require("fs");
const { v4 } = require("uuid");

const route = require("express").Router();

const databasePath = path.join(__dirname, "..", "data", "products.json");

route.get("/admin/addProduct", (req, res) => {
	res.render("addProdukt", {
		pageTitle: "Add new product",
		title: "Add produkt",
	});
});

route.post("/admin/addProduct", (req, res) => {
	const { title, price } = req.body;
	const product = {
		id: v4(),
		title,
		price,
	};

	fs.readFile(databasePath, (err, products) => {
		const updatedProducts = [...JSON.parse(products), product];

		fs.writeFile(databasePath, JSON.stringify(updatedProducts), () => {
			res.redirect("/");
		});
	});
});

module.exports = route;
