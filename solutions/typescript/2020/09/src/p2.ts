/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { split, task } from '@alexaegis/advent-of-code-lib';
import { ascending } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };
import type { Args } from './args.interface.js';

export const p2 = (input: string, args?: Args): number => {
	const xmas = split(input).map((line) => Number.parseInt(line, 10));
	const target = args?.target ?? Number.NaN;
	for (let i = 0; i < xmas.length; i++) {
		let sum = xmas[i]!;
		let window = 1;
		const seq = [sum];
		while (sum <= target) {
			const num = xmas[i + window]!;
			sum += num;
			seq.push(num);
			if (sum === target) {
				const sorted = seq.sort(ascending);
				return sorted[0]! + sorted.at(-1)!;
			}
			window++;
		}
	}
	return 0;
};

await task(p2, packageJson.aoc); // 28509180 ~2.8ms
