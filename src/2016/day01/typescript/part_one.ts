import { bench, read } from '@lib';
import { Direction } from '@lib/model/direction.class';
import { Vec2 } from '@lib/model/vec2.class';
import { day, year } from '.';

export const runner = (input: string): number =>
	input
		.split(', ')
		.reduce(
			(acc, next) => {
				if (next[0] === 'R') acc.direction = acc.direction.right();
				if (next[0] === 'L') acc.direction = acc.direction.left();
				acc.position.addMut(acc.direction, Number(next.substring(1)));
				return acc;
			},
			{ position: Vec2.ORIGO, direction: Direction.NORTH }
		)
		.position.manhattan(Vec2.ORIGO);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 300 ~0.37ms
}
