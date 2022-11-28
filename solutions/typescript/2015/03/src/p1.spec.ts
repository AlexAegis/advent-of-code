import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2015 - Day 3 - Part One', () => {
	it('should resolve to 2572 when using the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(2572);
	});

	it('should be that that the first example resolves to 2', async () => {
		expect(await runner('>')).to.equal(2);
	});

	it('should be that that the second example resolves to 4', async () => {
		expect(await runner('^>v<')).to.equal(4);
	});

	it('should be that that the third example resolves to 2', async () => {
		expect(await runner('^v^v^v^v^v')).to.equal(2);
	});
});
