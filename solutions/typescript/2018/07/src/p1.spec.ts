import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2018 - Day 7 - Part One', () => {
	it('should resolve to GRTAHKLQVYWXMUBCZPIJFEDNSO when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(await p1(resources.input)).to.equal('GRTAHKLQVYWXMUBCZPIJFEDNSO');
	});

	it('should resolve to CABDFE when using the example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.txt');
		expect(await p1(resources.input)).to.equal('CABDFE');
	});
});
