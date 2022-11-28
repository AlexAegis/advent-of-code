import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2017 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(1060);
	});

	it('should be that that the first example resolves to 3', async () => {
		expect(await runner('1212')).to.equal(6);
	});

	it('should be that that the second example resolves to 3', async () => {
		expect(await runner('1221')).to.equal(0);
	});

	it('should be that that the third example resolves to 0', async () => {
		expect(await runner('123425')).to.equal(4);
	});

	it('should be that that the fourth example resolves to 9', async () => {
		expect(await runner('123123')).to.equal(12);
	});

	it('should be that that the fifth example resolves to 4', async () => {
		expect(await runner('12131415')).to.equal(4);
	});
});
