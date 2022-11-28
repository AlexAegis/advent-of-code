import { bench, read } from '@alexaegis/advent-of-code-lib';
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

export const runner = (input: string): number | undefined => {
	return mostLos([...parseLines(input).values()])?.losCount;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 230 ~61ms
}
