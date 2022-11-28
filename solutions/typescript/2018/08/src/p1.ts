import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpreter } from './interpeter.function.js';
import { Node } from './model/node.class.js';

export const runner = (input: string): number => new Node(interpreter(input)).sum();

// TODO: Reimplement 2018/08, call stack size exceeded

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 47112 ~6ms
}
