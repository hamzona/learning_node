const express = require("express");

const route = express.Router();

const {
	redirectPage,
	getProducts,
	findProduct,
} = require("../controllers/products.controllers");

route.get("/", redirectPage);

route.get("/products", getProducts);

route.get("/product/:id", findProduct);

module.exports = route;
