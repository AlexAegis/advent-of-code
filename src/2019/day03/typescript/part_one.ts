import { bench, read } from '@lib';
import { Vec2 } from '@lib/model/vec2.class';
import { flattenVectors } from '@lib/model/vector.class';
import { day, year } from '.';
import { parse } from './parse';

export const runner = (input: string): number => {
	const p = parse(input);
	const a = flattenVectors(p[0]);
	const b = flattenVectors(p[1]);
	const possInts = new Map<string, { a: Vec2; b: Vec2 | undefined }>();
	a.forEach((ap) => {
		possInts.set(ap.c.toString(), { a: ap.c, b: undefined });
	});

	return Vec2.ORIGO.manhattan(
		b
			.filter((bp) => possInts.has(bp.c.toString()))
			.map((v) => v.c)
			.reduce((min, n) =>
				min === undefined || Vec2.ORIGO.manhattan(n) <= Vec2.ORIGO.manhattan(min as Vec2)
					? n
					: min
			)
	);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1195 ~154ms
}
