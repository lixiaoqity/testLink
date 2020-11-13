const fs = require("fs");
const testLink = require("./test-link");
const testLinkColor = require("./test-link-color");
const regex = /(https?)(:\/\/)([-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+)/gi;

const readFile = (fileName, ignoreUrls, flag, flagj) => {
	let data;
	fs.readFile(fileName, (err, response) => {
		if (err) {
			console.log(`File {${fileName}} can not be found. Please try again!`);
		} else {
			data = response.toString();
			let urls = data.match(regex);
			if (urls) {
				for (let u of urls) {
					if (!u.match(ignoreUrls)) {
						try {
							if (process.env.CLICOLOR == 1) {
								if (flag && !u.startsWith("https")) {
									testLinkColor(u.replace(/^http/, "https"), flagj);
								} else {
									testLinkColor(u, flagj);
								}
							}
							if (process.env.CLICOLOR == 0) {
								if (flag && !u.startsWith("https")) {
									testLink(u.replace(/^http/, "https"), flagj);
								} else {
									testLink(u, flagj);
								}
							}
						} catch (error) {
							console.log(error);
						}
					}
				}
			} else {
				console.log(`No suitable http(s) url in file {${fileName}}.`);
			}
		}
	});
};

module.exports = readFile;
