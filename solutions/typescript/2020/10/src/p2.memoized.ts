/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { memoize, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

/**
 * This performs worse than the original solution with the inner cache
 */
const makeBranchCounter = (jolts: number[], builtIn: number) => {
	const branchCounter = (index: number): number => {
		const current = jolts[index]!;
		if (current === builtIn) {
			return 1;
		}
		let result = 0;
		for (let i = 1; i <= 3; i++) {
			const next = jolts[index + i]!;
			if (next - current <= 3) {
				result += memoizedBranchCounter(index + i);
			}
		}
		return result;
	};
	const memoizedBranchCounter = memoize(branchCounter);
	return memoizedBranchCounter;
};

export const p2memoized = (input: string): number => {
	const { jolts, builtIn } = parse(input);
	return makeBranchCounter(jolts, builtIn)(0);
};

await task(p2memoized, packageJson.aoc); // 169255295254528 ~0.06ms
