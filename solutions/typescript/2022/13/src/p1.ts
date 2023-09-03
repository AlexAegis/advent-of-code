import { DOUBLE_NEWLINE, split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { signalComparator, type Signal } from './signal-comparator.function.js';

export const p1 = (input: string): number =>
	input
		.split(DOUBLE_NEWLINE)
		.map((g) => split(g).map((l) => JSON.parse(l) as Signal) as [Signal, Signal])
		.map(([a, b], i) => {
			return signalComparator(a, b) < 0 ? i + 1 : 0;
		})
		.sum();

await task(p1, packageJson.aoc); // 6369 ~0.54ms
