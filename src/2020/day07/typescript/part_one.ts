import { bench, read, split } from '@lib';
import { day, year } from '.';
import { Bag } from './bag.class';

export const runner = (input: string): number => {
	const lines = split(input);

	const bags = new Map<string, Bag>();

	const getBag = (color: string): Bag => {
		if (!bags.has(color)) {
			bags.set(color, new Bag(color));
		}
		return bags.get(color) as Bag;
	};
	for (const line of lines) {
		//const matches = line.match(
		//	/^([a-z ]+) bags contain ((, )?((\d+) (\w+) bags)|(no other bags))*.$/
		//);

		const [color, toRaw] = line.split(' bags contain ');
		const toRules = toRaw
			.split(', ')
			.map((toRuleRaw) => toRuleRaw.replace('.', '').replace(/bags?/g, '').trim().split(' '))
			.map(([q, ...rest]) => ({
				c: rest.join(' '),
				q: parseInt(q, 10),
			}));

		const bag = getBag(color);
		for (const rule of toRules) {
			if (!isNaN(rule.q)) {
				const bagRule = getBag(rule.c);
				bag.canContain.set(bagRule, rule.q);
			}
		}
	}

	const goldBag = getBag('shiny gold');

	return [...bags.values()].filter((bag) => bag.canEventuallyContain(goldBag)).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 197 ~41ms
}
