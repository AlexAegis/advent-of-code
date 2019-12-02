import { bench, read } from '@lib';
import { day, year } from '.';
import { compute } from './compute';
import { parse } from './parse';

export const runner = async (input: string) => {
	const arr = parse(input);
	let noun = 0;
	let verb = 0;
	while (true) {
		if (compute(arr, noun, verb) === 19690720) {
			break;
		}
		noun += 1;
		if (noun >= 99) {
			noun = 0;
			verb++;
		}
	}
	return 100 * noun + verb;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 8478 ~11ms
}
