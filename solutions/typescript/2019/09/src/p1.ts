import { IntCodeComputer } from '@alexaegis/advent-of-code-intcode';
import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const p1 = (input: string): string =>
	new IntCodeComputer(parse(input)).withInput(1).execute().join(',');

await task(p1, packageJson.aoc); // 3507134798 ~1.62ms
