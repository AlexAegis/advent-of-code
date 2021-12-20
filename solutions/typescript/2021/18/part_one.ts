import { bench, read } from '@lib';
import { day, year } from '.';
import { addSnailfishNumbers, getMagnitude, parseSnailfishNumber } from './model';

export const runner = (input: string): number => {
	const snailfishNumbers = input.lines().map(parseSnailfishNumber);
	const sum = addSnailfishNumbers(...snailfishNumbers);
	return getMagnitude(sum);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 4184 ~70.82ms
}
