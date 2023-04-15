import { loadTaskResources, parseLetterMatrix } from '@alexaegis/advent-of-code-lib';
import { stringToMatrix } from '@alexaegis/advent-of-code-lib/string';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2022 10 p2', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(parseLetterMatrix(stringToMatrix(p2(input)))).to.equal('PZULBAUA');
		});
	});

	describe('example 2', () => {
		it('should be solved', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.2.txt');
			expect(p2(input)).to.equal(`\
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`);
		});
	});
});
