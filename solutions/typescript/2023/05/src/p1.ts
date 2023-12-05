import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const p1 = (input: string): number => {
	const data = parse(input);
	console.log(data);
	return 0;
};

await task(p1, packageJson.aoc, 'example.1.txt'); // 0 ~4.36ms
// await task(p1, packageJson.aoc); // 0 ~4.36ms
