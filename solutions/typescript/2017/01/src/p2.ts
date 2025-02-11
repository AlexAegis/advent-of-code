import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const nums = [...input].filter((c) => /^([+-])?\d+/.test(c)).map((c) => Number.parseInt(c, 10));
	let sum = 0;
	for (let i = 0; i < nums.length; i++) {
		const n = nums[i];
		if (n && n === nums[(i + nums.length / 2) % nums.length]) {
			sum += n;
		}
	}
	return sum;
};

await task(p2, packageJson.aoc); // 1060 ~0.9ms
