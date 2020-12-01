import { bench, read, split } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const numbers = split(input).map((line) => parseInt(line, 10));
	for (const a of numbers) {
		for (const b of numbers) {
			for (const c of numbers) {
				if (a + b + c === 2020) {
					return a * b * c;
				}
			}
		}
	}
	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 262738554 ~10ms
}
