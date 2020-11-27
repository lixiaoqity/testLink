const testLink = require('./test-link');
const nock = require('nock');

const originalConsoleLogFn = global.console.log;
const originalConsoleErrorFn = global.console.error;

describe('url test', () => {
	let logOutput = null;
	let errorOutput = null;

	function testLogFn(...args) {
		logOutput = logOutput || [];
		args.forEach((arg) => logOutput.push(arg));
	}

	function testErrorFn(...args) {
		errorOutput = errorOutput || [];
		args.forEach((arg) => errorOutput.push(arg));
	}
	function finalize(output) {
		if (output && Array.isArray(output)) {
			return output.join('');
		}
		return output;
	}

	beforeEach(() => {
		global.console.log = testLogFn;
		global.console.error = testErrorFn;

		logOutput = null;
		errorOutput = null;
	});

	afterEach(() => {
		global.console.log = originalConsoleLogFn;
		global.console.error = originalConsoleErrorFn;

		logOutput = null;
		errorOutput = null;
	});

	test('normal url return url is good', async () => {
		const url = 'https://www.google.com';
		const urlData = 'https://www.google.com is good.';

		nock(url).intercept('/', 'HEAD').reply(200);
		await testLink(url, false);
		expect(finalize(logOutput)).toEqual(urlData);
	});

	test('wrong url return url is bad', async () => {
		const url = 'https://web422-leon-blog.herokuapp.com/';
		const urlData = 'https://web422-leon-blog.herokuapp.com/ is bad.';

		nock(url).intercept('/', 'HEAD').reply(404);
		await testLink(url, false);
		expect(finalize(logOutput)).toEqual(urlData);
	});
	test('url should return a JSON output', async () => {
		const url = 'https://www.google.com';
		const urlData = `{"url":"https://www.google.com","status":200}`;

		nock(url).intercept('/', 'HEAD').reply(200);
		await testLink(url, true);
		expect(finalize(logOutput)).toEqual(urlData);
	});
});
