import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number =>
	input
		.lines()
		.map((line) => {
			const [, codes] = line.split(/ \| /).map((codes) => codes.split(/ /g));
			return (
				codes?.count(
					(value) =>
						value.length === 2 ||
						value.length === 3 ||
						value.length === 4 ||
						value.length === 7
				) ?? 0
			);
		})
		.sum();

await task(p1, packageJson.aoc); // 473 ~0.22ms
