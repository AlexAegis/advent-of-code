import { describe, expect, it } from 'vitest';
import { splitRucksackIntoCompartments } from './split-rucksack-into-compartments.function.js';

describe('splitRucksackIntoCompartments', () => {
	it('should return 2 elements for a rucksack', () => {
		expect(splitRucksackIntoCompartments('MRMZMWsNpFFFVFHW').length).toBe(2);
	});

	it('should split a rucksack right at the middle', () => {
		expect(splitRucksackIntoCompartments('vJrwpWtwJgWrhcsFMMfFFhFp')).toStrictEqual([
			'vJrwpWtwJgWr',
			'hcsFMMfFFhFp',
		]);
	});
});
