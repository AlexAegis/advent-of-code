import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

export const runner = (input: string) =>
	new IntCodeComputer(parse(input))
		.withInput(1)
		.execute()
		.join(',');

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3507134798 ~1.62ms
}
