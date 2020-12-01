import { bench, read, split } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	split(input)
		.map((line) => {
			return line;
		})
		.forEach((line) => {
			console.log(line);
		});

	return 1;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3399947 ~0.3ms
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 3399947 ~0.3ms
}
