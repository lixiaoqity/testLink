const request = require('request');

const testLink = async (u, j) => {
	return new Promise((resolve) => {
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
						console.log(u + ' is unknown.');
					}
				} else {
					console.log(u + ' is un.');
				}
			}
			resolve();
		});
	});
};
module.exports = testLink;
