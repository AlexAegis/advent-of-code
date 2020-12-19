import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

export const runner = (input: string): number | undefined =>
	new IntCodeComputer(parse(input)).withInput(2).execute().pop();

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 84513 ~107ms
}
