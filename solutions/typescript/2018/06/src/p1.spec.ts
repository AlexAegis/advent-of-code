import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2018 - Day 6 - Part One', () => {
	it('should resolve to 3006 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(3006);
	});

	it('should resolve to 17 when using the example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.txt');
		expect(p1(resources.input)).toEqual(17);
	});
});
