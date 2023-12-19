import { IntCodeComputer } from '@alexaegis/advent-of-code-intcode';
import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const hasBeam = (tape: number[], x: number, y: number): boolean => {
	const i = new IntCodeComputer(tape);
	const it = i.iter();
	i.pushInput(x);
	i.pushInput(y);
	const cam = it.next().value as number;
	return cam === 1;
};

export const p1 = (input: string): number => {
	const tape = parse(input);
	let c = 0;
	for (let x = 0; x < 50; x++) {
		for (let y = 0; y < 50; y++) {
			if (hasBeam(tape, x, y)) {
				c++;
			}
		}
	}
	return c;
};

await task(p1, packageJson.aoc); // 110 ~391ms
