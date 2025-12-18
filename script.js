document.getElementById("submit-button").addEventListener("click", function () {
	const text = document.getElementById("my-text").value;
	document.getElementById("result").textContent = text;
});