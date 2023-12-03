import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	return input.lines().length;
};

await task(p1, packageJson.aoc); // 2149 ~0.22ms
