import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { Bag } from './bag.class.js';
import { parse } from './parse.function.js';

export const p2 = (input: string): number => {
	const bags = parse(input);
	const goldBag = bags.getOrAdd('shiny gold', Bag.create);
	return goldBag.howManyBagsCanItContain();
};

await task(p2, packageJson.aoc); // 85324 ~3.9ms
