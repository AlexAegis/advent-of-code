import { bench, read } from '@lib';
import { day, year } from '.';
import { Bag } from './bag.class';
import { parse } from './parse.function';

export const runner = (input: string): number => {
	const bags = parse(input);
	const goldBag = bags.getOrAdd('shiny gold', Bag.create);
	return [...bags.values()].filter((bag) => bag.canEventuallyContain(goldBag)).length;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 197 ~41ms
}
