import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { Signal, signalComparator } from './signal-comparator.function.js';

export const p2 = (input: string): number => {
	const signals = split(input).map((l) => JSON.parse(l) as Signal);
	const divider1 = [[2]];
	const divider2 = [[6]];
	const divider1Key = JSON.stringify(divider1);
	const divider2Key = JSON.stringify(divider2);
	signals.push(divider1);
	signals.push(divider2);
	signals.sort((a, b) => signalComparator(a, b));
	const divider1Index = signals.findIndex((i) => JSON.stringify(i) === divider1Key) + 1;
	const divider2Index = signals.findIndex((i) => JSON.stringify(i) === divider2Key) + 1;
	return divider1Index * divider2Index;
};

await task(p2, packageJson.aoc); // 25800 ~1.08ms
