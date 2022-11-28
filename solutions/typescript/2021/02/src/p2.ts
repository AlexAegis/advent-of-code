import { bench, read } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import { parseSubmarineCommand } from './model/submarine-command.interface.js';
import { SubmarineInstruction } from './model/submarine-instruction.enum.js';

import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number => {
	const result = input
		.lines()
		.map(parseSubmarineCommand)
		.reduce(
			(acc, { amplitude, instruction }) => {
				if (instruction === SubmarineInstruction.FORWARD) {
					acc.position.addMut({
						x: amplitude,
						y: acc.aim * amplitude,
					});
				} else if (instruction === SubmarineInstruction.DOWN) {
					acc.aim = acc.aim + amplitude;
				} else if (instruction === SubmarineInstruction.UP) {
					acc.aim = acc.aim - amplitude;
				}
				return acc;
			},
			{ position: Vec2.ORIGIN.clone(), aim: 0 }
		);
	return result.position.x * result.position.y;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 1971232560 ~0.34ms
}
