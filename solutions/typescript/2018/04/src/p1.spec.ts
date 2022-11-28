import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2018 - Day 4 - Part One', () => {
	it('should resolve to 106710 when using the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(106710);
	});

	it('should resolve to 240 when using the example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.txt')();
		expect(runner(input.input)).to.equal(240);
	});
});
