import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	[...input].slideWindow(4).findIndex((w) => new Set(w).size === 4) + 4;

await task(p1, packageJson.aoc); // 1876 ~0.54ms
