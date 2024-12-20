import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2015 - Day 4 - Part One', () => {
	it(
		'should resolve to 346386 when using the input',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p1(resources.input)).toEqual(346_386);
		},
		{ timeout: 20_000 },
	);

	it(
		'should resolve to 609043 when using the example',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.txt');
			expect(p1(resources.input)).toEqual(609_043);
		},
		{ timeout: 20_000 },
	);

	it(
		'should resolve to 1048970 when using the second example',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
			expect(p1(resources.input)).toEqual(1_048_970);
		},
		{ timeout: 20_000 },
	);
});
