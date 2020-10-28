import { bench, read } from '@lib';
import { flattenVectors } from '@lib/model/vector.class';
import { day, year } from '.';
import { parse } from './parse';

export const runner = (input: string): number => {
	const p = parse(input);
	const a = flattenVectors(p[0]);
	const b = flattenVectors(p[1]);
	const possInts = new Map<string, { a: number; b: number }>();
	a.forEach((ap) => {
		possInts.set(ap.c.toString(), { a: ap.steps, b: Infinity });
	});

	b.forEach((bp) => {
		const ae = possInts.get(bp.c.toString());
		if (ae) {
			ae.b = bp.steps;
		}
	});
	let min = Infinity;
	for (const val of possInts.values()) {
		if (val.b) {
			min = val.a + val.b < min ? val.a + val.b : min;
		}
	}
	return min;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 91518 ~151ms
}
