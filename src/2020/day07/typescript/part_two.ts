import { bench, read } from '@lib';
import { day, year } from '.';
import { Bag } from './bag.class';
import { parse } from './parse.function';

export const runner = (input: string): number => {
	const bags = parse(input);
	const goldBag = bags.getOrAdd('shiny gold', Bag.create);
	return goldBag.howManyBagsCanItContain();
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 85324 ~3.9ms
}
