import { flattenVectors, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p1 = (input: string): number => {
	const p = parse(input);
	const a = flattenVectors(p[0]);
	const b = flattenVectors(p[1]);
	const possInts = new Map<string, { a: Vec2; b: Vec2 | undefined }>();
	a.forEach((ap) => {
		possInts.set(ap.c.toString(), { a: ap.c, b: undefined });
	});

	return Vec2.ORIGIN.manhattan(
		b
			.filter((bp) => possInts.has(bp.c.toString()))
			.map((v) => v.c)
			.reduce((min, n) =>
				min === undefined || Vec2.ORIGIN.manhattan(n) <= Vec2.ORIGIN.manhattan(min as Vec2)
					? n
					: min
			)
	);
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 1195 ~154ms
}
