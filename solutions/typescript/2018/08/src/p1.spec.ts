import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2018 - Day 8 - Part One', () => {
	it('should resolve to 47112 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(await p1(resources.input)).to.equal(47112);
	});

	it('should resolve to 138 when using the example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.txt');
		expect(await p1(resources.input)).to.equal(138);
	});
});
