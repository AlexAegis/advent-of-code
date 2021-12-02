import { bench, read } from '@lib';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';
import { SubmarineInstruction } from './model/submarine-instruction.enum';

export const runner = (input: string): number => {
	const result = input
		.lines()
		.map((line) => {
			const [dir, num] = line.split(' ');
			const velocity = parseInt(num, 10);
			let direction = Direction.EAST;
			if (dir === SubmarineInstruction.UP) {
				direction = Direction.SOUTH;
			} else if (dir === SubmarineInstruction.DOWN) {
				direction = Direction.NORTH;
			}
			return { direction, velocity };
		})
		.reduce(
			(acc, next) => acc.addMut(next.direction, { times: next.velocity }),
			Vec2.ORIGIN.clone()
		);

	return result.x * result.y;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1882980 ~0.34ms
}
