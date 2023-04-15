import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import {
	addSnailfishNumbers,
	getMagnitude,
	parseSnailfishNumber,
} from './model/snailfish-number.js';

export const p1 = (input: string): number => {
	const snailfishNumbers = input.lines().map(parseSnailfishNumber);
	const sum = addSnailfishNumbers(...snailfishNumbers);
	return getMagnitude(sum);
};

await task(p1, packageJson.aoc); // 4184 ~70.82ms
