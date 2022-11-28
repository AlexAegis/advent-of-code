import { bench, read } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const hasBeam = (tape: number[], x: number, y: number): boolean => {
	const i = new IntCodeComputer(tape);
	const it = i.iter();
	i.pushInput(x);
	i.pushInput(y);
	const cam = it.next().value;
	return cam === 1;
};

export const runner = (input: string): number => {
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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 110 ~391ms
}
