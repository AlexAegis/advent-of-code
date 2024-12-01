import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2019 - Day 16 - Part One', () => {
	it(
		'should resolve to 30369587 when using the input',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p1(resources.input)).toEqual('30369587');
		},
		{ timeout: 20_000 },
	);
});
