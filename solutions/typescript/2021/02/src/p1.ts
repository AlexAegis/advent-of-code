import { bench, read } from '@alexaegis/advent-of-code-lib';
import { Direction, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parseSubmarineCommand } from './model/submarine-command.interface.js';
import { SubmarineInstruction } from './model/submarine-instruction.enum.js';

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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 1882980 ~0.34ms
}
