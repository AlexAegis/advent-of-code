import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2018 - Day 7 - Part One', () => {
	it('should resolve to GRTAHKLQVYWXMUBCZPIJFEDNSO when using the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(await runner(input.input)).to.equal('GRTAHKLQVYWXMUBCZPIJFEDNSO');
	});

	it('should resolve to CABDFE when using the example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.txt')();
		expect(await runner(input.input)).to.equal('CABDFE');
	});
});
