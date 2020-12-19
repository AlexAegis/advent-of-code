import { bench, read } from '@lib';
import { memoize } from '@lib/functions';
import { day, year } from '.';
import { parse } from './parse.function';

/**
 * This performs worse than the original solution with the inner cache
 */
const makeBranchCounter = (jolts: number[], builtIn: number) => {
	const branchCounter = (index: number): number => {
		const current = jolts[index];
		if (current === builtIn) {
			return 1;
		}
		let result = 0;
		for (let i = 1; i <= 3; i++) {
			const next = jolts[index + i];
			if (next - current <= 3) {
				result += memoizedBranchCounter(index + i);
			}
		}
		return result;
	};
	const memoizedBranchCounter = memoize(branchCounter);
	return memoizedBranchCounter;
};

export const runner = (input: string): number => {
	const { jolts, builtIn } = parse(input);
	return makeBranchCounter(jolts, builtIn)(0);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 169255295254528 ~0.06ms
}
