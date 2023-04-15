import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { Bag } from './bag.class.js';
import { parse } from './parse.function.js';

export const p1 = (input: string): number => {
	const bags = parse(input);
	const goldBag = bags.getOrAdd('shiny gold', Bag.create);
	return [...bags.values()].count((bag) => bag.canEventuallyContain(goldBag));
};

await task(p1, packageJson.aoc); // 197 ~41ms
