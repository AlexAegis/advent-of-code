import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

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

export const p2 = (input: string): number => {
	const { jolts, builtIn } = parse(input);
	return countBranches(jolts, 0, builtIn);
};

await task(p2, packageJson.aoc); // 169255295254528 ~0.03ms
