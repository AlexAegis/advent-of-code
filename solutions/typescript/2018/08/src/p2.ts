import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpreter } from './interpeter.function.js';
import { Node } from './model/node.class.js';

export const p2 = (input: string): number => new Node(interpreter(input)).value();

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 28237 ~6ms
}
