import { bench, read } from '@lib';
import { day, year } from '.';

const fuel = (i: number): number => {
	const f = Math.max(Math.floor(i / 3) - 2, 0);
	let m = 0;
	if (f > 0) {
		m = fuel(f);
	}
	return f + m;
};

export const runner = async (input: string) =>
	input
		.split(/\r?\n/)
		.map(n => fuel(Number(n)))
		.reduce((s, n) => s + n, 0);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 5097039 ~0.38ms
}
