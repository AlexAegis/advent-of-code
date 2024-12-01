import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import {
	addSnailfishNumbers,
	getMagnitude,
	parseSnailfishNumber,
} from './model/snailfish-number.js';

export const p2 = (input: string): number =>
	input
		.lines()
		.pairsWith()
		.map((pair) => getMagnitude(addSnailfishNumbers(...pair.map(parseSnailfishNumber))))
		.max();

await task(p2, packageJson.aoc); // 4731 ~1053.30ms
