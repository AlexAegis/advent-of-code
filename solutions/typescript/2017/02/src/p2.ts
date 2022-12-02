import { split, task } from '@alexaegis/advent-of-code-lib';
import { divisible } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number =>
	split(input)
		.map((line) => {
			const [big, small] = line.splitToInt().desc().bubbleFindPair(divisible);
			return big / small;
		})
		.sum();

await task(p2, packageJson.aoc); // 250 ~0.0505ms
