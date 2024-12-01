import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2019 - Day 6 - Part One', () => {
	it(
		'should resolve to 223251 when using the input',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p1(resources.input)).toEqual(223_251);
		},
		{ timeout: 20_000 },
	);

	it(
		'should be that that the first example resolves to 42',
		() => {
			expect(p1('COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L')).toEqual(42);
		},
		{ timeout: 20_000 },
	);
});
