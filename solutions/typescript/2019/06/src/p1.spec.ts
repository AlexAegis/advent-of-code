import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe(`2019 - Day 6 - Part One`, () => {
	it(
		`should resolve to 223251 when using the input`,
		async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p1(resources.input)).to.equal(223251);
		},
		{ timeout: 20000 }
	);

	it(
		'should be that that the first example resolves to 42',
		async () => {
			expect(await p1('COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L')).to.equal(
				42
			);
		},
		{ timeout: 20000 }
	);
});
