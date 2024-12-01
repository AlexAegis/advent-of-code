import { BoundingBox, Vec2, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpret } from './interpret.function.js';

export const p1 = (input: string): number | undefined => {
	const points = interpret(input);
	const aabb = BoundingBox.fromVectors(points);
	aabb.pad(0, 1);
	const bucket = new Map<string, Vec2[]>();

	for (const x of aabb.horizontal.iter()) {
		for (const y of aabb.vertical.iter()) {
			const ordered: Vec2[] = points.sort((a, b) => a.manhattan(x, y) - b.manhattan(x, y));
			if (ordered[0]?.manhattan(x, y) !== ordered[1]?.manhattan(x, y)) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const b = bucket.getOrAdd(ordered[0]!.toString(), () => []);
				b.push(new Vec2(x, y));
			}
		}
	}
	const bound: number[] = [];
	for (const territory of bucket.values()) {
		if (
			!territory.some(
				(point) =>
					point.x <= aabb.left ||
					point.y <= aabb.top ||
					point.x >= aabb.right ||
					point.y >= aabb.bottom - 1, // magic boundary bandaid
			)
		) {
			bound.push(territory.length);
		}
	}
	return bound.reduce((acc, next) => (next > acc ? next : acc), 0);
};

await task(p1, packageJson.aoc); // 3006 ~230ms
