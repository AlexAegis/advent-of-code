import { presentInAll, split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number =>
	split(input)
		.getSizedGroups(3)
		.map((group) => group.map((rucksack) => [...new Set<string>(rucksack)]))
		.map((group) => group.map((rucksack) => rucksack.map((i) => i.alphabeticalOrder())))
		.map((group) => presentInAll(group)[0])
		.sum();

await task(p2, packageJson.aoc); // 2425 ~1.01ms
