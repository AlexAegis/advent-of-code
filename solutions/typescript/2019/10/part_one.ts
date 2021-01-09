import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { iterate } from 'iterare';
import { day, year } from '.';
import { parseLines } from './parse';

export interface CoordWithLosCount {
	coord: Vec2;
	losCount: number;
}

export const mostLos = (flat: Vec2[]): CoordWithLosCount | undefined => {
	return flat
		.map((f) => ({
			losCount: flat
				.filter((fo) => !fo.equals(f))
				.map((o) => iterate(f.reach(o)).find((l) => !!flat.find((fl) => fl.equals(l))))
				.filter((n) => !n).length,
			coord: f,
		}))
		.reduce(
			(a, n) => (a === undefined ? n : n.losCount > a.losCount ? n : a),
			undefined as CoordWithLosCount | undefined
		);
};

export const runner = (input: string): number | undefined => {
	return mostLos([...parseLines(input).values()])?.losCount;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 230 ~61ms
}
