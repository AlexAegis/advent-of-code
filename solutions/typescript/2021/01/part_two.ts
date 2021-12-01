import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number =>
	input
		.splitToInt()
		.slideWindow(3)
		.map((window) => window.sum())
		.slideWindow()
		.count(([a, b]) => a < b);

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1395 ~0.39ms
}
