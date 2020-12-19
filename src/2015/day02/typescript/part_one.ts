import { bench, read, split } from '@lib';
import { min, sum } from '@lib/math';
import { day, year } from '.';

export const runner = async (input: string): Promise<number> =>
	split(input)
		.map((line) => line.split('x').map((c) => Number(c)))
		.map(([l, w, h]) => [l * w, w * h, h * l])
		.map((sides) => sides.reduce(min) + sides.reduce(sum) * 2)
		.reduce(sum, 0);

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3803038 ~2ms
}
