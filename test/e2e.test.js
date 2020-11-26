/* eslint-disable no-undef */
const execa = require('execa');
const { describe, test, expect } = require('@jest/globals');
expect.addSnapshotSerializer(require('jest-snapshot-serializer-ansi'));

describe('end-to-end integration', () => {
	test('prints tool version with arument -v', async () => {
		const { stdout, stderr } = await execa('node', ['index', '-v']);
		expect(stdout).toMatchSnapshot();
		expect(stderr).toEqual('');
	});

	test('prints url information with a path', async () => {
		const { stdout, stderr } = await execa('node', ['index', 'test2.html']);
		expect(stdout).toMatchSnapshot();
		expect(stderr).toEqual('');
	});

	test('prints url information with two path', async () => {
		const { stdout, stderr } = await execa('node', [
			'index',
			'test2.html',
			'testIgnoreTestFile.txt',
		]);
		expect(stdout).toMatchSnapshot();
		expect(stderr).toEqual('');
	});

	test('prints url information with path and json output', async () => {
		const { stdout, stderr } = await execa('node', [
			'index',
			'-j',
			'test2.html',
		]);
		expect(stdout).toMatchSnapshot();
		expect(stderr).toEqual('');
	});

	test('prints url information with ignore arugment', async () => {
		const { stdout, stderr } = await execa('node', [
			'index',
			'-i',
			'test2.html',
			'testIgnoreTestFile',
		]);
		expect(stdout).toMatchSnapshot();
		expect(stderr).toEqual('');
	});
});
