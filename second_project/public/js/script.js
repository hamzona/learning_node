const buttons = document.querySelectorAll("button");

buttons.forEach((b) => {
	b.addEventListener("click", () => {
		alert("add to cart");
	});
});
