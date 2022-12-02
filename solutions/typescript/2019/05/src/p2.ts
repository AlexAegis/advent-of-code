import { task } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p2 = (input: string): number | undefined =>
	new IntCodeComputer(parse(input)).withInput(5).execute().pop();

await task(p2, packageJson.aoc); // 6959377 ~1.25ms
