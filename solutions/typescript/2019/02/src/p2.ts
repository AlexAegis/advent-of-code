import { bench, read } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const runner = (input: string): number => {
	const tape = parse(input);
	const computer = new IntCodeComputer(tape);
	let noun = 0;
	let verb = 0;
	o: for (noun = 0; noun <= 100; noun++) {
		for (verb = 0; verb <= 100; verb++) {
			if (computer.reset(tape).withNoun(noun).withVerb(verb).run().peek(0) === 19690720) {
				break o;
			}
		}
	}
	return 100 * noun + verb;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 8478 ~11ms
}
