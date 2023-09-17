import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';
import { parse } from './parse.js';

describe('2019 - Day 5 - Part One', () => {
	it('should resolve to 16348437 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(16_348_437);
	});

	it('should be that that both the first examples resolves to 0', () => {
		const computer = new IntCodeComputer(parse('1,0,0,0,99'));
		computer.execute();
		expect(computer.peek(0)).toEqual(2);
	});
});
