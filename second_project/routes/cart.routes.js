const express = require("express");

const route = express.Router();

const { getCarts } = require("../controllers/cart.controllers");

route.get("/cart", getCarts);

module.exports = route;
