import { task } from '@alexaegis/advent-of-code-lib';
import { Direction, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import { parseSubmarineCommand } from './model/submarine-command.interface.js';
import { SubmarineInstruction } from './model/submarine-instruction.enum.js';

export const p1 = (input: string): number => {
	const result = input
		.lines()
		.map(parseSubmarineCommand)
		.reduce((acc, next) => {
			let direction = Direction.EAST;
			if (next.instruction === SubmarineInstruction.UP) {
				direction = Direction.NORTH;
			} else if (next.instruction === SubmarineInstruction.DOWN) {
				direction = Direction.SOUTH;
			}
			return acc.addMut(direction, { times: next.amplitude });
		}, Vec2.ORIGIN.clone());
	return result.x * result.y;
};

await task(p1, packageJson.aoc); // 1882980 ~0.34ms
