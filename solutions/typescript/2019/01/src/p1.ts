import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number =>
	input
		.split(/\r?\n/)
		.filter((n) => !!n)
		.map((n) => Math.floor(Number.parseInt(n, 10) / 3) - 2)
		.reduce((s, n) => s + n, 0);

await task(p1, packageJson.aoc); // 3399947 ~0.3ms
