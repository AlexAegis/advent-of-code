import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.function.js';

export const p1 = (input: string): number => {
	const instructions = parse(input);
	let x = 1;
	let cycle = 0;
	const signalStrengths: number[] = [];

	for (const instruction of instructions) {
		cycle += 1;

		if (cycle % 40 === 20) {
			signalStrengths.push(x * cycle);
		}

		if (typeof instruction === 'number') {
			x += instruction;
		}
	}

	return signalStrengths.sum();
};

await task(p1, packageJson.aoc); // 11780 ~0.04ms
