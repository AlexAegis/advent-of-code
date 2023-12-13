import { cartesianCombinations, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

function generateVariations(damagedLog: string, criteria: RegExp): string[] {
	const variants = [...damagedLog].map((entry) => (entry === '?' ? ['#', '.'] : [entry]));
	return cartesianCombinations(...variants)
		.map((combination) => combination.join(''))
		.filter((combination) => criteria.test(combination));
}

export const p1 = (input: string): number =>
	parse(input)
		.map((spring) => generateVariations(spring.log, spring.criteriaRegExp).length)
		.sum();

await task(p1, packageJson.aoc); // 7118 ~0ms
