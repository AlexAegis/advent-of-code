import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

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

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 8478 ~11ms
}
