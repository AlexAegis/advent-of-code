import { task } from '@alexaegis/advent-of-code-lib';
import type { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parseLines } from './parse.js';
export interface CoordWithLosCount {
	coord: Vec2;
	losCount: number;
}

export const mostLos = (flat: Vec2[]): CoordWithLosCount | undefined => {
	return flat
		.map((f) => ({
			losCount: flat
				.filter((fo) => !fo.equals(f))
				.map((o) => [...f.reach(o)].find((l) => !!flat.find((fl) => fl.equals(l))))
				.count((n) => !n),
			coord: f,
		}))
		.reduce(
			(a, n) => (a === undefined ? n : n.losCount > a.losCount ? n : a),
			undefined as CoordWithLosCount | undefined
		);
};

export const p1 = (input: string): number | undefined => {
	return mostLos([...parseLines(input).values()])?.losCount;
};

await task(p1, packageJson.aoc); // 230 ~61ms
