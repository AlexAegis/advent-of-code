import { task } from '@alexaegis/advent-of-code-lib';
import { flattenVectors, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const p1 = (input: string): number => {
	const [first, second] = parse(input);
	const a = flattenVectors(first);
	const b = flattenVectors(second);
	const possInts = new Map<string, { a: Vec2; b: Vec2 | undefined }>();
	for (const ap of a) {
		possInts.set(ap.c.toString(), { a: ap.c, b: undefined });
	}

	return Vec2.ORIGIN.manhattan(
		b
			.filter((bp) => possInts.has(bp.c.toString()))
			.map((v) => v.c)
			.reduce(
				(min, n) => (Vec2.ORIGIN.manhattan(n) <= Vec2.ORIGIN.manhattan(min) ? n : min),
				Vec2.INIFINITY_NE,
			),
	);
};

await task(p1, packageJson.aoc); // 1195 ~154ms
