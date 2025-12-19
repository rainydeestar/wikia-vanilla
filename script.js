import { parser } from './parser.js';

document.getElementById("my-text").addEventListener("input", function () {
	const text = document.getElementById("my-text").value;
	document.getElementById("result").innerHTML = parser(text);
});