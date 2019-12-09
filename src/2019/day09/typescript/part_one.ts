import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

export const runner = (input: string) => new IntCodeComputer(parse(input)).withInput(1).execute();

if (require.main === module) {
	// (async () => console.log(`Result: ${await runner('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99')}`))();
	// (async () => console.log(`Result: ${await runner('1102,34915192,34915192,7,4,7,99,0')}`))();
	// (async () => console.log(`Result: ${await runner('104,1125899906842624,99')}`))();
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
// ! 203
