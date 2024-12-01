import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const p1 = (input: string): number => {
	const { jolts, max } = parse(input);

	const diffs = new Map<number, number>();
	let currentJoltage = 0;

	while (currentJoltage <= max) {
		const next =
			jolts.find((jolt) => jolt - currentJoltage <= 3 && jolt - currentJoltage > 0) ?? 0;
		const diff = next - currentJoltage;
		currentJoltage = next;
		diffs.set(diff, (diffs.get(diff) ?? 0) + 1);
	}

	return (diffs.get(1) ?? 0) * (diffs.get(3) ?? 0);
};

await task(p1, packageJson.aoc); // 2201 ~0.08ms
