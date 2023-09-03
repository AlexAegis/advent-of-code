import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2020 - Day 15 - Part One', () => {
	it('should solve for the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(1015);
	});

	it('should solve for the first example', () => {
		expect(p1('0,3,6')).to.equal(436);
	});

	it('should solve for the second example', () => {
		expect(p1('1,3,2')).to.equal(1);
	});

	it('should solve for the third example', () => {
		expect(p1('2,1,3')).to.equal(10);
	});

	it('should solve for the fourth example', () => {
		expect(p1('1,2,3')).to.equal(27);
	});

	it('should solve for the fifth example', () => {
		expect(p1('2,3,1')).to.equal(78);
	});

	it('should solve for the sixth example', () => {
		expect(p1('3,2,1')).to.equal(438);
	});

	it('should solve for the seventh example', () => {
		expect(p1('3,1,2')).to.equal(1836);
	});
});
