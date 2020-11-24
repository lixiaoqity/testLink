const request = require('request');

const testLink = (u, j) => {
	request({ url: u, method: 'HEAD' }, (error, response) => {
		if (j == true) {
			let temp = {
				url: u,
				status: response.statusCode,
			};
			console.log(JSON.stringify(temp));
		} else {
			if (!error) {
				if (response.statusCode == 200) {
					console.log(u + ' is good.');
				} else if (response.statusCode == 400 || response.statusCode == 404) {
					console.log(u + ' is bad.');
				} else if (
					response.statusCode == 301 ||
					response.statusCode == 307 ||
					response.statusCode == 308
				) {
					console.log(u + ' is redirect.');
				} else {
					console.log(u + ' is unknow.');
				}
			} else {
				console.log(u + ' is unknow.');
			}
		}
	}).setMaxListeners(50);
};

module.exports = testLink;
