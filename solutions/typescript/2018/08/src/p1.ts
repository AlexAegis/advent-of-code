import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { MemoryNode } from './model/node.class.js';

export const p1 = (input: string): number => {
	const tape = input.splitToInt();
	const root = new MemoryNode(tape[0], tape[1]);
	root.read(tape, 2);
	return root.sum();
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 47112 ~1.83ms
}
