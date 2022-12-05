import { DOUBLE_NEWLINE, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parseCommands, parseStacks } from './parse.function.js';

export const p1 = (input: string): string => {
	const [rawStacks, rawCommands] = input.split(DOUBLE_NEWLINE);
	const stacks = parseStacks(rawStacks);
	const commands = parseCommands(rawCommands);

	for (const command of commands) {
		const movedCrates = stacks[command.from].splice(0, command.count);
		stacks[command.to].unshift(...movedCrates.reverse());
	}

	return stacks.map((stack) => stack[0]).join('');
};

await task(p1, packageJson.aoc); // MQTPGLLDN ~0.29ms
