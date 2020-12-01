import { bench, read, split } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const numbers = split(input).map((line) => parseInt(line, 10));
	for (let i = 0; i < numbers.length; i++) {
		const ni = numbers[i];
		for (let j = i; j < numbers.length; j++) {
			const nj = numbers[j];
			if (ni + nj === 2020) {
				return ni * nj;
			}
		}
	}
	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 787776 ~0.37ms
}
