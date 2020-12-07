const fs = require('fs').promises;
const testLink = require('./test-link');
const testLinkColor = require('./test-link-color');
const regex = /(https?)(:\/\/)([-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+)/gi;

const readFile = async (fileName, ignoreUrls, flag, flagj) => {
	let data, urls;
	try {
		data = await fs.readFile(fileName, 'utf8');
	} catch (error) {
		throw new Error(`File {${fileName}} can not be found. Please try again!`);
	}
	if (data) {
		urls = data.match(regex);
	}
	if (urls) {
		for (let u of urls) {
			if (!u.match(ignoreUrls)) {
				try {
					if (process.env.CLICOLOR == 1) {
						if (flag && !u.startsWith('https')) {
							testLinkColor(u.replace(/^http/, 'https'), flagj);
						} else {
							testLinkColor(u, flagj);
						}
					}
					if (process.env.CLICOLOR == 0) {
						if (flag && !u.startsWith('https')) {
							testLink(u.replace(/^http/, 'https'), flagj);
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
	return data;
};

module.exports = readFile;
