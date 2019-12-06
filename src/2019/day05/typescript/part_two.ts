import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

export const runner = async (input: string) =>
	new IntCodeComputer(parse(input), true)
		.withInput(5)
		.execute()
		.pop();

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 6959377 ~1.25ms
}
