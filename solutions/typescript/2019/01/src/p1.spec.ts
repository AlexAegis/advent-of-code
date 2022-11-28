import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2019 - Day 1 - Part One', () => {
	it(`should resolve to 3399947 when using the input`, async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(3399947);
	});

	it('should be that that the first example resolves to 2', async () => {
		expect(await runner('12')).to.equal(2);
	});

	it('should be that that the second example resolves to 2', async () => {
		expect(await runner('14')).to.equal(2);
	});

	it('should be that that the third example resolves to 654', async () => {
		expect(await runner('1969')).to.equal(654);
	});

	it('should be that that the fourth example resolves to 33583', async () => {
		expect(await runner('100756')).to.equal(33583);
	});
});
