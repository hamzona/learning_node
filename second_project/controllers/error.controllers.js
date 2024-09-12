exports.get404 = (req, res) => {
	const error = { message: "Not found" };
	res.render("error.ejs", { pageTitle: "Error", path: "", error });
};
