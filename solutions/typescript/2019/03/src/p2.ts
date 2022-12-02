import { task } from '@alexaegis/advent-of-code-lib';
import { flattenVectors } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p2 = (input: string): number => {
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

await task(p2, packageJson.aoc); // 91518 ~151ms
