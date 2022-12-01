import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { MemoryNode } from './model/node.class.js';

export const p2 = (input: string): number => {
	const tape = input.splitToInt();
	const root = new MemoryNode(tape[0], tape[1]);
	root.read(tape, 2);
	return root.value();
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 28237 1.70ms
}
