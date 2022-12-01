import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2020 - Day 15 - Part Two', () => {
	it(
		'should solve for the input',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p2(resources.input)).to.equal(201);
		},
		{ timeout: 20000 }
	);

	// ! Disabled example test cases because of long runtime
	/*
	it('should solve for the first example', () => {
		expect(p2('0,3,6')).to.equal(175594);
	}, {timeout: 20000});

	it('should solve for the second example', () => {
		expect(p2('1,3,2')).to.equal(2578);
	}, {timeout: 20000});

	it('should solve for the third example', () => {
		expect(p2('2,1,3')).to.equal(3544142);
	}, {timeout: 20000});

	it('should solve for the fourth example', () => {
		expect(p2('1,2,3')).to.equal(261214);
	}, {timeout: 20000});

	it('should solve for the fifth example', () => {
		expect(p2('2,3,1')).to.equal(6895259);
	}, {timeout: 20000});

	it('should solve for the sixth example', () => {
		expect(p2('3,2,1')).to.equal(18);
	}, {timeout: 20000});

	it('should solve for the seventh example', () => {
		expect(p2('3,1,2')).to.equal(362);
	}, {timeout: 20000});
	*/
});
