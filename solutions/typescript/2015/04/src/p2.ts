import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { hashSearch } from './hash-search.function.js';

export const p2 = hashSearch(6);

await task(p2, packageJson.aoc); // 9958218 ~18622ms
