import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { calculate } from './p1.js';

export const p2 = calculate(30_000_000);

await task(p2, packageJson.aoc); // 201 ~4932.26ms
