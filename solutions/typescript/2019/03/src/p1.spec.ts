import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2019 - Day 3 - Part One', () => {
	it('should resolve to 1195 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(1195);
	});

	it('should be that that the first example resolves to 610', () => {
		expect(p1('R8,U5,L5,D3\nU7,R6,D4,L4')).to.equal(6);
	});

	it('should be that that the second example resolves to 159', () => {
		expect(p1('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83')).to.equal(
			159,
		);
	});

	it('should be that that the third example resolves to 135', () => {
		expect(
			p1('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'),
		).to.equal(135);
	});
});
