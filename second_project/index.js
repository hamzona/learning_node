const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	const products = fs.readFile(
		path.join(__dirname, "data", "products.json"),
		(err, products) => {
			res.render("index", {
				pageTitle: "nesto",
				title: "Hamza",
				products: JSON.parse(products),
			});
		},
	);
});

app.get("/addProduct", (req, res) => {
	res.render("addProdukt", { pageTitle: "nesto drugo", title: "add produkt" });
});

app.post("/addProduct", (req, res) => {
	const { title, price } = req.body;

	const databasePath = path.join(__dirname, "data", "products.json");

	fs.readFile(databasePath, (err, products) => {
		console.log(JSON.parse(products));

		const updatedProducts = [...JSON.parse(products), { title, price }];

		fs.writeFile(databasePath, JSON.stringify(updatedProducts), () => {
			res.redirect("/");
		});
	});
});

app.listen(5000);
