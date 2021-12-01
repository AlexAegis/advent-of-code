import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number =>
	input
		.splitToInt()
		.slideWindow()
		.filter(([a, b]) => a < b).length;

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1451 ~0.33ms
}
