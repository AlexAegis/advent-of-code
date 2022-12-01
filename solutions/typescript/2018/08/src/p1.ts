import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpreter } from './interpeter.function.js';
import { Node } from './model/node.class.js';

export const p1 = (input: string): number => new Node(interpreter(input)).sum();

// TODO: Reimplement 2018/08, call stack size exceeded

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 47112 ~6ms
}
