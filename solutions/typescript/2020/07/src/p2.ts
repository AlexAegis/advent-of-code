import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { Bag } from './bag.class.js';
import { parse } from './parse.function.js';

export const runner = (input: string): number => {
	const bags = parse(input);
	const goldBag = bags.getOrAdd('shiny gold', Bag.create);
	return goldBag.howManyBagsCanItContain();
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 85324 ~3.9ms
}
