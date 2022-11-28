import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe(`2017 - Day 1 - Part One`, () => {
	it(`should resolve to 1177 when using the input`, async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(1177);
	});

	it('should be that that the first example resolves to 3', async () => {
		expect(await runner('1122')).to.equal(3);
	});

	it('should be that that the second example resolves to 3', async () => {
		expect(await runner('1111')).to.equal(4);
	});

	it('should be that that the third example resolves to 0', async () => {
		expect(await runner('1234')).to.equal(0);
	});

	it('should be that that the fourth example resolves to 9', async () => {
		expect(await runner('91212129')).to.equal(9);
	});
});
