import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { hashSearch } from './hash-search.function.js';

export const p1 = hashSearch(5);

await task(p1, packageJson.aoc); // 346386 ~663ms
