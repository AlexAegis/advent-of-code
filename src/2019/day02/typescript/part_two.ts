import { IntCodeComputer } from '@2019/day05/typescript/intcode.class';
import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';

export const runner = async (input: string) => {
	const tape = parse(input);
	const computer = new IntCodeComputer(tape);
	let noun = 0; // 84
	let verb = 0; // 78
	o: for (noun = 0; noun <= 100; noun++) {
		for (verb = 0; verb <= 100; verb++) {
			computer.reset(tape);
			computer.noun = noun;
			computer.verb = verb;
			computer.execute();
			if (computer.peek(0) === 19690720) {
				break o;
			}
		}
	}
	return 100 * noun + verb;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 8478 ~11ms
}
