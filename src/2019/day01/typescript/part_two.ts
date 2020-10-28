import { bench, read } from '@lib';
import { day, year } from '.';

const fuel = (i: number): number => {
	const f = Math.max(Math.floor(i / 3) - 2, 0);
	return f + (f > 0 ? fuel(f) : 0);
};

export const runner = (input: string): number =>
	input
		.split(/\r?\n/)
		.map((n) => fuel(Number(n)))
		.reduce((s, n) => s + n, 0);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 5097039 ~0.36ms
}
