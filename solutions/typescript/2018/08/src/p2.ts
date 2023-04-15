import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { MemoryNode } from './model/node.class.js';

export const p2 = (input: string): number => {
	const tape = input.splitToInt();
	const root = new MemoryNode(tape[0]!, tape[1]!);
	root.read(tape, 2);
	return root.value();
};

await task(p2, packageJson.aoc); // 28237 1.70ms
