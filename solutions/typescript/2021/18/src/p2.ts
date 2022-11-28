import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import {
	addSnailfishNumbers,
	getMagnitude,
	parseSnailfishNumber,
} from './model/snailfish-number.js';

export const runner = (input: string): number =>
	input
		.lines()
		.pairsWith()
		.map((pair) => getMagnitude(addSnailfishNumbers(...pair.map(parseSnailfishNumber))))
		.max();

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 4731 ~1053.30ms
}
