//const testLink = require('./test-link');
const request = require('request');
jest.mock('request');

describe('url test', () => {
	test('normal url return 200', async () => {
		const url = 'https://www.google.com';
		request({ url: url, method: 'HEAD' }, (error, response) => {
			status = response.statusCode;
			expect(status).toBe(200);
		});
	});

	test('wrong url return 404', async () => {
		const url = 'https://www.google.com/cds';
		request({ url: url, method: 'HEAD' }, (error, response) => {
			status = response.statusCode;
			expect(status).toBe(404);
		});
	});
});
