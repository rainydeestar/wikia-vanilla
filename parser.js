// Takes in a text and returns it in an html format
export function parser(text) {
	const lines = text.split("\n");
	let html = "";
	const listType = [];

	for (let line of lines) {
		line = line.replace(/&/g, "&amp;");						// for & (needs to be first lol)

		line = line.replace(/\</g, "&lt;");						// for <
		line = line.replace(/\>/g, "&gt;");						// for >
		line = line.replace(/\"/g, "&quot;");					// for ""
		line = line.replace(/\'/g, "&apos;");					// for ''

		line = line.replace(/^# (.*$)/, "<h1>$1</h1><hr>");		// # Heading 1
		line = line.replace(/^#{2} (.*$)/, "<h2>$1</h2>");		// ## Heading 2
		line = line.replace(/^#{3} (.*$)/, "<h3>$1</h3>");		// ### Heading 3
		line = line.replace(/^#{4} (.*$)/, "<h4>$1</h4>");		// #### Heading 4
		line = line.replace(/^#{5} (.*$)/, "<h5>$1</h5>");		// ##### Heading 5

		line = line.replace(/^----$/gim, "<hr>");				// Line

		line = listHandler(line, listType);						// Lists

		line = line.replace(/^(?!<).+/gim, "<p>$&</p>");			// paragraph

		// INLINE MARKUPS

		line = line.replace(/(?<!\\)\*\*(.*?)\*\*/gim, "<b>$1</b>");// **bold**
		line = line.replace(/(?<!\\)\*(.*?)\*/gim, "<i>$1</i>");	// *italics*
		line = line.replace(/(?<!\\)~~(.*?)~~/gim, "<s>$1</s>");	// ~~strikethrough~~
		line = line.replace(/(?<!\\)__(.*?)__/gim, "<u>$1</u>");	// __underline__
		line = line.replace(/(?<!\\)\`(.*?)\`/gim, "<code>$1</code>");	// `code`

		line = line.replace(/(?<!\\)\[(.*?)\]\((.*?)\)/gim, "<a href=\"$2\">$1</a>");	// `code`

		// BACKSLASHES (need to be at end)

		line = line.replace(/\\\\/gim, "&#92;");					// Backslashes 
		line = line.replace(/\\/gim, "");							// Backslashes

		html += line;
	}

	return html;
}

function listHandler(line, listType) {
	const listDictionary = {
		"*": "ul",
		"-": "ol"
	}
	const prefixCount = countPrefix(line);
	const listDepth = listType.length;

	let markup = "p";
	let output = line;

	if (prefixCount > 0) {
		output = line.substring(prefixCount+1);
		output = `<li>${output}</li>`;

		for (let i = listDepth; i < prefixCount; i++) {
			markup = listDictionary[line.charAt(i)];
			output = `<${markup}>${output}`;
			listType.push(line.charAt(prefixCount-1));
		}
	} 

	for (let i = listDepth; i > prefixCount; i--) {
		markup = listDictionary[listType.pop()];
		output = `</${markup}>\n${output}`;
	}

	return output;
}

// Counts how many time a "*" and "-" are before a line, without a space
function countPrefix(line) {
	const regex = new RegExp(`^[*\-]+(?= )`);
	const prefixCount = line.match(regex)?.[0].length ?? 0;

	return prefixCount;
}