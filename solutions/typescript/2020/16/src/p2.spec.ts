import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { getMyClarifiedTicket, runner } from './p2.js';

describe('2020 - Day 16 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(resources.input)).to.equal(3173135507987);
	});

	it('should solve the first example', async () => {
		const resources = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();

		expect(
			getMyClarifiedTicket(resources.input).every(
				(field) =>
					(field.fieldName === 'class' && field.value === 12) ||
					(field.fieldName === 'row' && field.value === 11) ||
					(field.fieldName === 'seat' && field.value === 13)
			)
		).to.be.true;
	});
});
