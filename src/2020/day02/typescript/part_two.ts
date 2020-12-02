import { bench, read, split } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const numbers = split(input).map((line) => parseInt(line, 10));
	for (const n of numbers) {
		console.log(n);
	}

	return 0;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 787776 ~0.37ms
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 787776 ~0.37ms
}
