import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2015 - Day 1 - Part One', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(74);
	});

	it('should be that that both the first examples resolves to 0', () => {
		expect(p1('(())')).to.equal(0);
		expect(p1('()()')).to.equal(0);
	});

	it('should be that that both the second and the third examples resolves to 3', () => {
		expect(p1('(((')).to.equal(3);
		expect(p1('(()(()(')).to.equal(3);
		expect(p1('))(((((')).to.equal(3);
	});

	it('should be that that both the fourth examples resolves to -1', () => {
		expect(p1('())')).to.equal(-1);
		expect(p1('))(')).to.equal(-1);
	});

	it('should be that that both the fith examples resolves to -3', () => {
		expect(p1(')))')).to.equal(-3);
		expect(p1(')())())')).to.equal(-3);
	});
});
