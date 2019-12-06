import { bench, read } from '@lib';
import { day, year } from '.';
import { IntCodeComputer } from '../../../lib/typescript/intcode/intcode.class';
import { parse } from './parse';

export const runner = async (input: string) =>
	new IntCodeComputer(parse(input), true)
		.withInput(1)
		.execute()
		.pop();

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 16348437 ~1.2ms
}
