import { split } from '@lib';
import { Bag } from './bag.class';

export const parse = (input: string): Map<string, Bag> => {
	const bags = new Map<string, Bag>();
	for (const line of split(input)) {
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

		const bag = bags.getOrAdd(color, Bag.create);
		for (const rule of toRules) {
			if (!isNaN(rule.q)) {
				const bagRule = bags.getOrAdd(rule.c, Bag.create);
				bag.canContain.set(bagRule, rule.q);
			}
		}
	}

	return bags;
};
