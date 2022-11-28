import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2019 - Day 3 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(91518);
	});

	it('should be that that the first example resolves to 610', async () => {
		expect(await runner('R8,U5,L5,D3\nU7,R6,D4,L4')).to.equal(30);
	});

	it('should be that that the second example resolves to 610', async () => {
		expect(
			await runner('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83')
		).to.equal(610);
	});

	it('should be that that the third example resolves to 410', async () => {
		expect(
			await runner(
				'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
			)
		).to.equal(410);
	});
});
