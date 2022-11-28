import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2019 - Day 4 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(1148);
	});

	it('should be that that the first example resolves to 1', async () => {
		expect(runner('112233-112233')).to.equal(1);
	});

	it('should be that that the second example resolves to 0', async () => {
		expect(runner('123444-123444')).to.equal(0);
	});

	it('should be that that the third example resolves to 1', async () => {
		expect(runner('111122-111122')).to.equal(1);
	});
});
