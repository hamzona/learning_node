const route = require("express").Router();

const {
	addProductAction,
	addProductPage,
	adminOrders,
	adminProducts,
} = require("../controllers/admin.controllers");

route.get("/admin/addProduct", addProductPage);
route.post("/admin/addProduct", addProductAction);
route.get("/admin/products", adminProducts);
route.get("/admin/orders", adminOrders);

module.exports = route;
