import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
	const lines = split(input);
	console.log(lines);
	return 0;
};

await task(p1, packageJson.aoc); // 433 ~1.10ms
