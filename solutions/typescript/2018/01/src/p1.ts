import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => eval(input);

await task(p1, packageJson.aoc); // 408 ~0.19ms
