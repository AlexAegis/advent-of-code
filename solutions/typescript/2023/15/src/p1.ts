import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { hash } from './internal/hash.js';

export const p1 = (input: string): number => input.lines(false).first().split(',').map(hash).sum();

await task(p1, packageJson.aoc); // 495972 ~0.19ms
