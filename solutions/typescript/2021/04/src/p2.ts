import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { Bingo } from './model/bingo.class.js';

export const p2 = (input: string): number => {
	const { numbers, boards } = Bingo.parse(input);
	const lastWinner = Bingo.runUntilLast(boards, numbers);
	return lastWinner?.score() ?? 0;
};

await task(p2, packageJson.aoc); // 31892 ~53.56ms
