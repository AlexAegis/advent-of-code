import { bench, read } from '@lib';
import { day, year } from '.';
import { compute } from './compute';
import { parse } from './parse';

export const runner = async (input: string) => {
	const arr = parse(input);
	let noun = 0; // 84
	let verb = 0; // 78
	o: for (noun = 0; noun <= 100; noun++) {
		for (verb = 0; verb <= 100; verb++) {
			if (compute(arr, noun, verb) === 19690720) {
				break o;
			}
		}
	}
	return 100 * noun + verb;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 8478 ~11ms
}
