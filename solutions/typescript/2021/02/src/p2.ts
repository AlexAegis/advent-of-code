import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import { parseSubmarineCommand } from './model/submarine-command.interface.js';
import { SubmarineInstruction } from './model/submarine-instruction.enum.js';

import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const result = input
		.lines()
		.map(parseSubmarineCommand)
		.reduce(
			(acc, { amplitude, instruction }) => {
				switch (instruction) {
					case SubmarineInstruction.FORWARD: {
						acc.position.addMut({
							x: amplitude,
							y: acc.aim * amplitude,
						});

						break;
					}
					case SubmarineInstruction.DOWN: {
						acc.aim = acc.aim + amplitude;

						break;
					}
					case SubmarineInstruction.UP: {
						acc.aim = acc.aim - amplitude;

						break;
					}
					// No default
				}
				return acc;
			},
			{ position: Vec2.ORIGIN.clone(), aim: 0 },
		);
	return result.position.x * result.position.y;
};

await task(p2, packageJson.aoc); // 1971232560 ~0.34ms
