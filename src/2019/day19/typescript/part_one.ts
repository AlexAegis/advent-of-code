import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

export const hasBeam = (tape: number[], x: number, y: number): boolean => {
	const i = new IntCodeComputer(tape);
	const it = i.iter();
	i.pushInput(x);
	i.pushInput(y);
	const cam = it.next().value;
	return cam === 1;
};

export const runner = async (input: string) => {
	const tape = parse(input);
	let c = 0;
	for (let x = 0; x < 50; x++) {
		for (let y = 0; y < 50; y++) {
			if (hasBeam(tape, x, y)) {
				c++;
			}
		}
	}
	return c;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 110 ~391ms
}
