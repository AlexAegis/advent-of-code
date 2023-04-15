import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p2 = (input: string): number => {
	const lines = split(input);
	console.log('lines', lines);
	return 0;
};

await task(p2, packageJson.aoc); // 0 ~0ms
