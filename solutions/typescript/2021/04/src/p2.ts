import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { Bingo } from './model/bingo.class.js';

export const runner = (input: string): number => {
	const { numbers, boards } = Bingo.parse(input);
	const lastWinner = Bingo.runUntilLast(boards, numbers);
	return lastWinner?.score() ?? 0;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 1882980 ~53.56ms
}
