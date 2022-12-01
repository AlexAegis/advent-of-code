import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { Bingo } from './model/bingo.class.js';

export const p2 = (input: string): number => {
	const { numbers, boards } = Bingo.parse(input);
	const lastWinner = Bingo.runUntilLast(boards, numbers);
	return lastWinner?.score() ?? 0;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 1882980 ~53.56ms
}
