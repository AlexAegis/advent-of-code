import { bench, read, split } from '@lib';
import { divisible } from '@lib/math';
import { day, year } from '.';

export const runner = (input: string): number =>
	split(input)
		.map((line) => {
			const [big, small] = line.split(/\s+/g).toInt().desc().bubbleFindPair(divisible);
			return big / small;
		})
		.sum();

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 250 ~0.0505ms
}
