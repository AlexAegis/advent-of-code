import { bench, read } from '@lib';
import { Coord } from '@lib/model/coord.class';
import { flattenVectors } from '@root/lib/typescript/model/vector.class';
import { day, year } from '.';
import { parse } from './parse';

export const runner = async (input: string) => {
	const p = parse(input);
	const a = flattenVectors(p[0]);
	const b = flattenVectors(p[1]);
	const possInts = new Map<string, { a: Coord; b: Coord | undefined }>();
	a.forEach(ap => {
		possInts.set(ap.c.toString(), { a: ap.c, b: undefined });
	});

	return Coord.ORIGO.manhattan(
		b
			.filter(bp => possInts.get(bp.c.toString()))
			.map(v => v.c)
			.reduce((min, n) =>
				min === undefined || Coord.ORIGO.manhattan(n) <= Coord.ORIGO.manhattan(min as Coord) ? n : min
			)
	);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1195 ~154ms
}
