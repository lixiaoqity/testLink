jest.mock('fs');
const fs = require('fs').promises;
// const readFile = require('./read-file');
describe('file test', () => {
	const filename = 'file';
	const fileData = '<p>Hello World</p>';

	beforeAll(() => {
		fs.__setMockFileData(filename, fileData);
	});

	test('read file', () => {
		fs.readFile(filename, (err, response) => {
			data = response.toString();
			expect(data).toEqual(fileData);
		});
	});
	// test('read file', () => {
	// 	fs.readFile(filename, (err, response) => {
	// 		data = response.toString();
	// 		expect(data).toEqual(fileData);
	// 	});
	// 	const data = readFile(filename, null, false, false);
	// 	expect(data).toEqual(fileData);
	// });
});
