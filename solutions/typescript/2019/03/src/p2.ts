import { task } from '@alexaegis/advent-of-code-lib';
import { flattenVectors } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p2 = (input: string): number => {
	const [first, second] = parse(input);
	const a = flattenVectors(first);
	const b = flattenVectors(second);
	const possInts = new Map<string, { a: number; b: number }>();
	for (const ap of a) {
		possInts.set(ap.c.toString(), { a: ap.steps, b: Number.POSITIVE_INFINITY });
	}

	for (const bp of b) {
		const ae = possInts.get(bp.c.toString());
		if (ae) {
			ae.b = bp.steps;
		}
	}
	let min = Number.POSITIVE_INFINITY;
	for (const val of possInts.values()) {
		if (val.b) {
			min = val.a + val.b < min ? val.a + val.b : min;
		}
	}
	return min;
};

await task(p2, packageJson.aoc); // 91518 ~151ms
