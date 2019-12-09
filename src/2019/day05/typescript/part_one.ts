import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

export const runner = async (input: string) =>
	new IntCodeComputer(parse(input))
		.withInput(1)
		.execute()
		.pop();

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 16348437 ~1.2ms
}
