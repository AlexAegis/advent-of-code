import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse.function';

const countBranches = (
	jolts: number[],
	index: number,
	builtIn: number,
	cache: Map<number, number> = new Map<number, number>()
): number => {
	const current = jolts[index];
	if (current === builtIn) {
		return 1;
	}
	let result = 0;
	for (let i = 1; i <= 3; i++) {
		const next = jolts[index + i];
		if (next - current <= 3) {
			if (cache.has(index + i)) {
				result += cache.get(index + i) ?? 0;
			} else {
				const branchResult = countBranches(jolts, index + i, builtIn, cache);
				cache.set(index + i, branchResult);
				result += branchResult;
			}
		}
	}
	return result;
};

export const runner = (input: string): number => {
	const { jolts, builtIn } = parse(input);
	return countBranches(jolts, 0, builtIn);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 169255295254528 ~0.03ms
}
