import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2019 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(5097039);
	});

	it('should be that that the first example resolves to 2', async () => {
		expect(await runner('14')).to.equal(2);
	});

	it('should be that that the second example resolves to 966', async () => {
		expect(await runner('1969')).to.equal(966);
	});

	it('should be that that the third example resolves to 50346', async () => {
		expect(await runner('100756')).to.equal(50346);
	});
});
