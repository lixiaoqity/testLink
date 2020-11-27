jest.mock('fs');
const fs = require('fs').promises;
const readFile = require('./read-file');

describe('file test', () => {
	const filename = 'file';
	const fileData = '<p>Hello World</p>';

	beforeAll(() => {
		fs.__setMockFileData(filename, fileData);
	});

	test('read file', async () => {
		const data = await readFile(filename, null, false, false);
		expect(data).toEqual(fileData);
	});
	test('a non-existing file should throw error', async () => {
		expect(() => readFile('abc', null, false, false)).rejects.toThrow();
	});
});
