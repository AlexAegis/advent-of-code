import { bench, read } from '@lib';
import { day, year } from '.';
import { addSnailfishNumbers, getMagnitude, parseSnailfishNumber } from './model';

export const runner = (input: string): number =>
	input
		.lines()
		.pairsWith()
		.map((pair) => getMagnitude(addSnailfishNumbers(...pair.map(parseSnailfishNumber))))
		.max();

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 4731 ~1053.30ms
}
