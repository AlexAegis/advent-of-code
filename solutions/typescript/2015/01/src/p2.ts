import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p2 = (input: string): number => {
	let a = 0;
	let i = 0;
	for (const char of [...input].filter((c) => c === '(' || c === ')')) {
		a += char === '(' ? 1 : -1;
		i++;
		if (a < 0) break;
	}
	return i;
};

await task(p2, packageJson.aoc); // 1795 ~1.2ms
