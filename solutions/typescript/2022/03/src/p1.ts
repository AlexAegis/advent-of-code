import { presentInAll, split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { splitRucksackIntoCompartments } from './split-rucksack-into-compartments.function.js';

export const p1 = (input: string): number =>
	split(input)
		.map(splitRucksackIntoCompartments)
		.map((compartments) => compartments.map((comp) => [...new Set<string>(comp.split(''))]))
		.map((compartments) => compartments.map((comp) => comp.map((i) => i.alphabeticalOrder())))
		.map((compartments) => presentInAll(compartments)[0])
		.sum();

await task(p1, packageJson.aoc); // 8053 ~1.22ms
