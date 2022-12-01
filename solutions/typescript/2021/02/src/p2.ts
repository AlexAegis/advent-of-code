import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import { parseSubmarineCommand } from './model/submarine-command.interface.js';
import { SubmarineInstruction } from './model/submarine-instruction.enum.js';

import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
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
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 1971232560 ~0.34ms
}
