import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { Bingo } from './model/bingo.class.js';

export const p1 = (input: string): number => {
	const { numbers, boards } = Bingo.parse(input);
	const winner = Bingo.run(boards, numbers);
	return winner?.score() ?? 0;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 10680 ~3.65ms
}
