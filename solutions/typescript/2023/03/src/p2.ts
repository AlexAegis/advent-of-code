import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p2 = (input: string): number => {
	return input.lines().length;
};

await task(p2, packageJson.aoc); // 0 ~0.22ms
