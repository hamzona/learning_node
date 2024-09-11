const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4 } = require("uuid");

const app = express();

const databasePath = path.join(__dirname, "data", "products.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => res.redirect("/products"));

app.get("/products", (req, res) => {
	const products = fs.readFile(
		path.join(__dirname, "data", "products.json"),
		(err, products) => {
			res.render("index", {
				pageTitle: "Home page",
				title: "Home",
				products: JSON.parse(products),
			});
		},
	);
});

app.get("/product/:id", (req, res) => {
	const { id } = req.params;

	console.log(id);

	fs.readFile(databasePath, (err, products) => {
		const product = JSON.parse(products).find((product) => product.id === id);

		console.log(product);
		res.render("product-datails", { pageTitle: product.title, product });
	});
});

app.get("/admin/addProduct", (req, res) => {
	res.render("addProdukt", {
		pageTitle: "Add new product",
		title: "Add produkt",
	});
});

app.post("/admin/addProduct", (req, res) => {
	const { title, price } = req.body;
	const product = {
		id: v4(),
		title,
		price,
	};
	fs.readFile(databasePath, (err, products) => {
		console.log(JSON.parse(products));

		const updatedProducts = [...JSON.parse(products), product];

		fs.writeFile(databasePath, JSON.stringify(updatedProducts), () => {
			res.redirect("/");
		});
	});
});

app.listen(5000);
