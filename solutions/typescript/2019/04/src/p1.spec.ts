import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe(`2019 - Day 4 - Part One`, () => {
	it(`should resolve to 1694 when using the input`, async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(1694);
	});

	it('should be that that the first example resolves to 1', async () => {
		expect(await p1('111111-111111')).to.equal(1);
	});

	it('should be that that the second example resolves to 0', async () => {
		expect(await p1('223450-223450')).to.equal(0);
	});

	it('should be that that the third example resolves to 0', async () => {
		expect(await p1('123789-123789')).to.equal(0);
	});
});
