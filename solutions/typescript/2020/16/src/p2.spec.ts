import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { getMyClarifiedTicket, p2 } from './p2.js';

describe('2020 - Day 16 - Part Two', () => {
	it('should solve the input', async () => {
		const { input } = await loadTaskResources(packageJson.aoc);
		expect(p2(input)).toEqual(3_173_135_507_987);
	});

	it('should solve the first example', async () => {
		const { input } = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(
			getMyClarifiedTicket(input).every(
				(field) =>
					(field.fieldName === 'class' && field.value === 12) ||
					(field.fieldName === 'row' && field.value === 11) ||
					(field.fieldName === 'seat' && field.value === 13),
			),
		).toEqual(true);
	});
});
