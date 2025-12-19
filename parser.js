export function parser(text) {
	let html = text;

	// SPECIAL CHARACTERS

	html = html.replace(/&/g, "&amp;");							// for & (needs to be first lol)

	html = html.replace(/\</g, "&lt;");							// for <
	html = html.replace(/\>/g, "&gt;");							// for >
	html = html.replace(/\"/g, "&quot;");						// for ""
	html = html.replace(/\'/g, "&apos;");						// for ''

	// BLOCK MARKUPS

	html = html.replace(/^# (.*$)/gim, "<h1>$1</h1><hr>");		// # Heading 1
	html = html.replace(/^#{2} (.*$)/gim, "<h2>$1</h2>");		// ## Heading 2
	html = html.replace(/^#{3} (.*$)/gim, "<h3>$1</h3>");		// ### Heading 3
	html = html.replace(/^#{4} (.*$)/gim, "<h4>$1</h4>");		// #### Heading 4
	html = html.replace(/^#{5} (.*$)/gim, "<h5>$1</h5>");		// ##### Heading 5

	html = html.replace(/^(?!<).+/gim, "<p>$&</p>");			// paragraph

	// INLINE MARKUPS

	html = html.replace(/(?<!\\)\*\*(.*?)\*\*/gim, "<b>$1</b>");// **bold**
	html = html.replace(/(?<!\\)\*(.*?)\*/gim, "<i>$1</i>");	// *italics*

	// BACKSLASHES (need to be at end)

	html = html.replace(/\\\\/gim, "&#92;");					// Backslashes 
	html = html.replace(/\\/gim, "");							// Backslashes

	

	return html.trim();
}