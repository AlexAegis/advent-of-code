import { bench, read, split } from '@lib';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { countTrees } from './part_one';

export const runner = (input: string): number => {
	const lines = split(input);

	const slopes = [
		//
		new Vec2(1, 1),
		new Vec2(3, 1),
		new Vec2(5, 1),
		new Vec2(7, 1),
		new Vec2(1, 2),
	];

	return slopes.reduce((acc, slope) => acc * countTrees(lines, slope), 1);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3154761400 ~0.6ms
}
