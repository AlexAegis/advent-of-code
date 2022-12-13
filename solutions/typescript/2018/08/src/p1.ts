import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { MemoryNode } from './model/node.class.js';

export const p1 = (input: string): number => {
	const tape = input.splitToInt();
	console.log('tape', tape);
	const root = new MemoryNode(tape[0], tape[1]);
	root.read(tape, 2);
	return root.sum();
};

await task(p1, packageJson.aoc); // 47112 ~1.83ms
