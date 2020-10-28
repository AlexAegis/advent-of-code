import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

export const runner = (input: string): number | undefined =>
	new IntCodeComputer(parse(input)).withNoun(12).withVerb(2).run().peek(0);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3101844 ~0.25ms
}
