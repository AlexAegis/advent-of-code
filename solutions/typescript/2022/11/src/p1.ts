import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const p1 = (input: string): number => {
	const { monkeyMap, monkeys } = parse(input);

	for (let round = 0; round < 20; round++) {
		for (const monkey of monkeys) {
			for (const item of monkey.items) {
				const afterBored = Math.floor(monkey.operation(item) / 3);
				if (afterBored % monkey.test === 0) {
					const target = monkeyMap[monkey.trueTarget];
					target.items.push(afterBored);
				} else {
					const target = monkeyMap[monkey.falseTarget];
					target.items.push(afterBored);
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

await task(p1, packageJson.aoc); // 108240 ~0.08ms
