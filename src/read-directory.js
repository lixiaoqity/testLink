const readFile = require('./read-file');
const fs = require('fs');

const readDirectory = (dir) => {
	let files;
	try {
		files = fs.readdirSync(dir);
		if (files) {
			files.forEach((file) => {
				readFile(`example/${file}`, false, false, false);
			});
		}
	} catch (error) {
		console.log(`Directory {${dir}} can not be found. Please try again!`);
	}
};

module.exports = readDirectory;
