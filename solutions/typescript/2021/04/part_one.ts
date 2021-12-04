import { bench, read } from '@lib';
import { day, year } from '.';
import { Bingo } from './model';

export const runner = (input: string): number => {
	const { numbers, boards } = Bingo.parse(input);
	const winner = Bingo.run(boards, numbers);
	return winner?.score() ?? 0;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 10680 ~3.65ms
}
