import { bench, read } from '@lib';
import { Direction } from '@lib/model';
import { day, year } from '.';
import { next } from './part_one';

export const runner = (input: string): number => {
	const graph = input.toGridGraph({
		valueConverter: (s) => s.tryInt(),
		connectionDirections: Direction.allDirections,
	});
	let step = 1;
	while (next(graph) !== graph.size) {
		step++;
	}
	return step;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 351 ~14.20ms
}
