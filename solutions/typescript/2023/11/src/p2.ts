import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { solver } from './p1.js';

export const p2 = (input: string): number => solver(1_000_000)(input);

await task(p2, packageJson.aoc); // 10228230 ~104.48ms
