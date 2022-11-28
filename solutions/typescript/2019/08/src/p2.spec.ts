import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2019 - Day 8 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		// 'LGYHB'
		expect(runner(input.input)).to.equal(
			'\n#`````##``#```##``#`###``\n#````#``#`#```##``#`#``#`\n#````#`````#`#`####`###``\n#````#`##```#``#``#`#``#`\n#````#``#```#``#``#`#``#`\n####``###```#``#``#`###``\n'
		);
	});
});
