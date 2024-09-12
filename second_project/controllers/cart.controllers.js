exports.getCarts = (req, res) => {
	res.render("cart", {
		pageTitle: "Cart",
		path: "/cart",
	});
};
