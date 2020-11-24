jest.mock('fs');
const fs = require('fs').promises;

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
});
