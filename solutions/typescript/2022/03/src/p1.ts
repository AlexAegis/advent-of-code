import { presentInAll, split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { getLetterOrder } from './get-letter-order.function.js';
import { splitRucksackIntoCompartments } from './split-rucksack-into-compartments.function.js';

export const p1 = (input: string): number =>
	split(input)
		.map(splitRucksackIntoCompartments)
		.map((rucksackSplitIntoCompartments) =>
			rucksackSplitIntoCompartments.map((compartment) => [
				...new Set<string>(compartment.split('')),
			])
		)
		.map((rucksackSplitIntoCompartments) =>
			rucksackSplitIntoCompartments.map((compartment) => compartment.map(getLetterOrder))
		)
		.map((rucksackSplitIntoCompartments) => presentInAll(rucksackSplitIntoCompartments)[0])
		.sum();

await task(p1, packageJson.aoc); // 8053 ~1.22ms
