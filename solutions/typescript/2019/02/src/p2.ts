import { IntCodeComputer } from '@alexaegis/advent-of-code-intcode';
import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const p2 = (input: string): number => {
	const tape = parse(input);
	const computer = new IntCodeComputer(tape);
	let noun = 0;
	let verb = 0;
	o: for (noun = 0; noun <= 100; noun++) {
		for (verb = 0; verb <= 100; verb++) {
			if (computer.reset(tape).withNoun(noun).withVerb(verb).run().peek(0) === 19_690_720) {
				break o;
			}
		}
	}
	return 100 * noun + verb;
};

await task(p2, packageJson.aoc); // 8478 ~11ms
