import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { collapse } from './collapse.function.js';

export const p1 = (input: string): number => collapse(input).length;

await task(p1, packageJson.aoc); // 9202 ~15ms
