import { DOUBLE_NEWLINE, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parseCommands, parseStacks } from './parse.function.js';

export const p2 = (input: string): string => {
	const [rawStacks, rawCommands] = input.split(DOUBLE_NEWLINE);
	const stacks = parseStacks(rawStacks);
	const commands = parseCommands(rawCommands);

	for (const command of commands) {
		const movedCrates = stacks[command.from].splice(0, command.count);
		stacks[command.to].unshift(...movedCrates);
	}

	return stacks.map((stack) => stack[0]).join('');
};

await task(p2, packageJson.aoc); // LVZPSTTCZ ~0.30ms
