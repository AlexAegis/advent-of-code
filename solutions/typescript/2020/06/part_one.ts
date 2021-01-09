import { bench, read } from '@lib';
import { sum } from '@lib/math';
import { day, year } from '.';

export const runner = (input: string): number =>
	input
		.split(/\r?\n\r?\n/)
		.map((group) => new Set(group.replace(/\r?\n/g, '')).size)
		.reduce(sum);

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 6542 ~1ms
}
