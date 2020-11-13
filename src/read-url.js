const request = require("request");
const testLink = require("./test-link");

const readUrl = (fileName, flagj) => {
	let data;
	request({ url: fileName, method: "GET" }, (error, response) => {
		if (!error) {
			try {
				data = JSON.parse(response.body);
			} catch (error) {
				console.log(`No json data in the ${JSON.stringify(fileName)}.`);
			}
		} else {
			console.log("Please input the correct url.");
		}
		if (data) {
			for (let u of data) {
				let url = "http://localhost:3000" + u.url;
				testLink(url, flagj);
			}
		}
	}).setMaxListeners(50);
};

module.exports = readUrl;
