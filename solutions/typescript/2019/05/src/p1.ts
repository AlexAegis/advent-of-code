import { IntCodeComputer } from '@alexaegis/advent-of-code-intcode';
import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const p1 = (input: string): number | undefined =>
	new IntCodeComputer(parse(input)).withInput(1).execute().pop();

await task(p1, packageJson.aoc); // 16348437 ~1.2ms
