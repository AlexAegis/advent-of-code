import { bench, read } from '@lib';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';

export const runner = (input: string): number =>
	input
		.split(', ')
		.reduce(
			(acc, next) => {
				if (next[0] === 'R') acc.direction = acc.direction.right();
				else if (next[0] === 'L') acc.direction = acc.direction.left();
				acc.position.addMut(acc.direction, { times: Number(next.substring(1)) });
				return acc;
			},
			{ position: Vec2.ORIGIN.clone(), direction: Direction.NORTH }
		)
		.position.manhattan(Vec2.ORIGIN);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 300 ~0.37ms
}
