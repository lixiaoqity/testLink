const fs = require('fs');
// const { url } = require("inspector");
const regexUrl = /^https?:\/\/[^-\s]*/gm;
const regexBadLine = /^(?!https?:\/\/|#).[^-\s]+/gm;

const findIgnoreUrls = (ignoreFilename) => {
	let data = fs.readFileSync(ignoreFilename).toString();
	const badLines = data.match(regexBadLine);
	const urlToIgnore = data.match(regexUrl);

	if (badLines != null) {
		throw badLines;
	}

	if (
		(badLines == null || badLines.length == 0) &&
		(urlToIgnore == null || urlToIgnore.length == 0)
	) {
		console.log('Empty file, nothing will be ignored');
		return null;
	} else if (urlToIgnore != null || urlToIgnore.length != 0) {
		return new RegExp('(' + urlToIgnore.join('|') + ').*'); // joins urls from ignore file to make a regex expression, .* is to match anything after the base url
	}
};

module.exports = findIgnoreUrls;
