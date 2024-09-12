const path = require("path");
const fs = require("fs");
const { v4 } = require("uuid");
const databasePath = path.join(__dirname, "..", "data", "products.json");

const getProductsFromFile = (cb) => {
	fs.readFile(databasePath, (err, products) => {
		if (err) {
			cb([]);
		}
		cb(JSON.parse(products));
	});
};

module.exports = class Product {
	constructor(title, price) {
		this.id = v4();
		this.title = title;
		this.price = price;
	}

	save() {
		getProductsFromFile((products) => {
			products.push({ title: this.title, price: this.price, id: this.id });
			fs.writeFile(databasePath, JSON.stringify(products), (err) => {
				if (err) {
					console.log(err);
				}
			});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static fetchById(id, cb) {
		getProductsFromFile((products) => {
			cb(products.find((p) => p.id === id));
		});
	}
};
