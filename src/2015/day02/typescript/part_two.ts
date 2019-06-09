import { asc, bench, dup, mult, read, split, sum } from '@root';
import { day, year } from '.';

export const runner = (input: string): number =>
	split(input)
		.map(line => line.split('x').map(c => Number(c)))
		.map(
			s =>
				s.reduce(mult, 1) +
				s
					.sort(asc)
					.slice(0, 2)
					.map(dup)
					.reduce(sum, 0)
		)
		.reduce(sum, 0);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3842356 ~2.4ms
}
