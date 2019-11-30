import { bench, read } from '@root/lib/typescript';
import { Coord } from '@root/lib/typescript/model/coord.class';
import { Direction } from '@root/lib/typescript/model/direction.class';
import { day, year } from '.';

export const runner = (input: string) =>
	input
		.split(', ')
		.reduce(
			(acc, next) => {
				if (next[0] === 'R') acc.direction = acc.direction.right();
				if (next[0] === 'L') acc.direction = acc.direction.left();
				acc.position.add(acc.direction, Number(next.substring(1)));
				return acc;
			},
			{ position: Coord.ORIGO, direction: Direction.NORTH }
		)
		.position.manhattan(Coord.ORIGO);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 300 ~0.37ms
}
