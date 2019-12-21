import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

export const runner = async (input: string) => {
	const i = new IntCodeComputer(parse(input));
	const it = i.iter();
	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await runner('')}`))();
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
