import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number =>
	input
		.split('')
		.filter((c) => c === '(' || c === ')')
		.reduce((a, n) => a + (n === '(' ? 1 : -1), 0);

await task(p1, packageJson.aoc); // 74 ~0.5ms
