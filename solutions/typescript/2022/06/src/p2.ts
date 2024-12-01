import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number =>
	[...input].slideWindow(14).findIndex((w) => new Set(w).size === 14) + 14;

await task(p2, packageJson.aoc); // 2202 ~1.79ms
