import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';
import { execute } from './part_one';

export const runner = (print = false) => (input: string): number | undefined => {
	const i = new IntCodeComputer(parse(input));

	i.pushAsciiInput(
		[
			'OR A T', // T = A
			'AND B T', // T = A AND B
			'AND C T', // T = A AND B AND C
			'NOT T T', // T = !A OR !B OR !C
			'OR E J', // J = E
			'OR H J', //  J = E OR H
			'AND T J', // J = (!A OR !B OR !C) AND (E OR H)
			'AND D J', // J = (!A OR !B OR !C) AND (E OR H) AND D
			'RUN',
		].join('\n')
	);

	return execute(i, print);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner(false))}`))(); // 1141251258 ~168ms
}
