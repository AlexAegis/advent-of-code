import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const runner = (input: string): number => {
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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 2201 ~0.08ms
}
