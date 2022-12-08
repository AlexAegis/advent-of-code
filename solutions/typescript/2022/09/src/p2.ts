import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const lines = split(input);
	console.log('input', lines);
	return 0;
};

await task(p2, packageJson.aoc, 'example.1.txt'); // 0 ~0ms
