import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parseLine } from './p1.js';

export const p2 = (input: string): number => {
	const lines = input.lines().map(parseLine);
	const seabed = new Map<string, number>();
	for (const { start, end } of lines) {
		for (const element of start.reach(end, true, true)) {
			const estr = element.toString();
			const existing = seabed.get(estr) ?? 0;
			seabed.set(estr, existing + 1);
		}
	}
	return [...seabed.values()].count((pipeHeight) => pipeHeight >= 2);
};

await task(p2, packageJson.aoc); // 22364 ~70.72ms
