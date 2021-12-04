import { bench, read } from '@lib';
import { day, year } from '.';
import { Bingo } from './model';

export const runner = (input: string): number => {
	const { numbers, boards } = Bingo.parse(input);
	const lastWinner = Bingo.runUntilLast(boards, numbers);
	return lastWinner?.score() ?? 0;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1882980 ~53.56ms
}
