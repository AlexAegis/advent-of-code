import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number =>
	input
		.split(/\r?\n/)
		.map((n) => Math.floor(Number(n) / 3) - 2)
		.reduce((s, n) => s + n, 0);

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3399947 ~0.3ms
}
