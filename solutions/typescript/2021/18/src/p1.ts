import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import {
	addSnailfishNumbers,
	getMagnitude,
	parseSnailfishNumber,
} from './model/snailfish-number.js';

export const runner = (input: string): number => {
	const snailfishNumbers = input.lines().map(parseSnailfishNumber);
	const sum = addSnailfishNumbers(...snailfishNumbers);
	return getMagnitude(sum);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 4184 ~70.82ms
}
