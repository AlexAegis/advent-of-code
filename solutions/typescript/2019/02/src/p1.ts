import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p1 = (input: string): number | undefined =>
	new IntCodeComputer(parse(input)).withNoun(12).withVerb(2).run().peek(0);

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 3101844 ~0.25ms
}
