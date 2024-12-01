import { IntCodeComputer } from '@alexaegis/advent-of-code-intcode';
import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';
import { parse } from './parse.js';

describe('2019 - Day 2 - Part One', () => {
	it('should resolve to 3101844 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(3_101_844);
	});

	it('should be that that the first example resolves to 3500', () => {
		const computer = new IntCodeComputer(parse('1,9,10,3,2,3,11,0,99,30,40,50'));
		computer.execute();
		expect(computer.peek(0)).toEqual(3500);
	});

	it('should be that that the second example resolves to 2', () => {
		const computer = new IntCodeComputer(parse('1,0,0,0,99'));
		computer.execute();
		expect(computer.peek(0)).toEqual(2);
	});

	it('should be that that the third example resolves to 2', () => {
		const computer = new IntCodeComputer(parse('2,3,0,3,99'));
		computer.execute();
		expect(computer.peek(0)).toEqual(2);
	});

	it('should be that that the fourth example resolves to 2', () => {
		const computer = new IntCodeComputer(parse('2,4,4,5,99,0'));
		computer.execute();
		expect(computer.peek(0)).toEqual(2);
	});

	it('should be that that the fifth example resolves to 30', () => {
		const computer = new IntCodeComputer(parse('1,1,1,4,99,5,6,0,99'));
		computer.execute();
		expect(computer.peek(0)).toEqual(30);
	});
});
