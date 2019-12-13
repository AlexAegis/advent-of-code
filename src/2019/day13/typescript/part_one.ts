import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';
import { TileType } from './part_two';

export const runner = (input: string) => {
	const i = new IntCodeComputer(parse(input)).iter();
	let a = 0;
	while (!i.next().done && !i.next().done) {
		if (i.next().value === TileType.BLOCK) a++;
	}
	return a;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 255 ~16ms
}
