import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpreter } from './interpeter.function.js';
import { Node } from './model/node.class.js';

export const runner = (input: string): number => new Node(interpreter(input)).value();

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 28237 ~6ms
}
