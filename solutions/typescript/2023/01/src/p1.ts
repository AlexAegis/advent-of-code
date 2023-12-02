import { NEWLINE, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	return input
		.split(NEWLINE)
		.map((group) => {
			const f = group
				.chars()
				.find((l) => /\d/.test(l))
				?.toInt()
				.toString();
			const l = group
				.chars()
				.reverse()
				.find((l) => /\d/.test(l))
				?.toInt()
				.toString();
			return f && l ? (f + l).toInt() : 0;
		})
		.sum();
};
await task(p1, packageJson.aoc); // 54644 ~?ms
