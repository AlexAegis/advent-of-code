import { bench, read } from '@alexaegis/advent-of-code-lib';
import { rotateArray } from '@alexaegis/advent-of-code-lib/functions';
import packageJson from '../package.json' assert { type: 'json' };
import { mostLos } from './p1.js';
import { parseLines } from './parse.js';

export const N = 200;

export const runner = (input: string): number | undefined => {
	const p = parseLines(input);
	let flat = [...p.values()];
	const start = mostLos(flat)?.coord;
	let d = 0;
	if (start) {
		while (d < N) {
			const los = start.los(flat);
			if (los.length + d >= N) {
				const sorted = rotateArray(
					los
						.map((c) => ({ c, angle: start.angle(c) }))
						.sort((a, b) => a.angle - b.angle),
					(_, c) => (c?.angle ?? 0) < -90
				).map((a) => a.c);

				for (const s of sorted) {
					d++;
					if (d === N) {
						return s.x * 100 + s.y;
					}
				}
			} else {
				// This optimization isn't effecting my input as the first group is larger than 200
				d += los.length;
			}

			flat = flat.filter((fl) => !los.find((l) => l.equals(fl)));
		}
	}
	return undefined;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 1205 ~64ms
}
