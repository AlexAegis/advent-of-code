import { lcm, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const p2 = (input: string): number => {
	const { monkeyMap, monkeys } = parse(input);
	const leastCommonTest = lcm(monkeys.map((m) => m.test));

	for (let round = 0; round < 10_000; round++) {
		for (const monkey of monkeys) {
			for (const item of monkey.items) {
				const afterBored = monkey.operation(item);

				if (afterBored % monkey.test === 0) {
					const target = monkeyMap[monkey.trueTarget];
					target?.items.push(afterBored % leastCommonTest);
				} else {
					const target = monkeyMap[monkey.falseTarget];
					target?.items.push(afterBored % leastCommonTest);
				}

				monkey.inspects++;
			}
			monkey.items = [];
		}
	}

	return monkeys
		.map((m) => m.inspects)
		.max(2)
		.product();
};

await task(p2, packageJson.aoc); // 25712998901 ~29.12ms
