import { bench, read } from '@lib';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';
import { parseSubmarineCommand } from './model';
import { SubmarineInstruction } from './model/submarine-instruction.enum';

export const runner = (input: string): number => {
	const result = input
		.lines()
		.map(parseSubmarineCommand)
		.reduce((acc, next) => {
			let direction = Direction.EAST;
			if (next.instruction === SubmarineInstruction.UP) {
				direction = Direction.SOUTH;
			} else if (next.instruction === SubmarineInstruction.DOWN) {
				direction = Direction.NORTH;
			}
			return acc.addMut(direction, { times: next.amplitude });
		}, Vec2.ORIGIN.clone());
	return result.x * result.y;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1882980 ~0.34ms
}
