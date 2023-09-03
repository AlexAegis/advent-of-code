import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { interpret } from './interpret.function.js';
import { Coord } from './model/coord.class.js';

export const p1 = (input: string): number | undefined => {
	const points = interpret(input);
	let boundaryTop: Coord | undefined;
	let boundaryRight: Coord | undefined;
	let boundaryBottom: Coord | undefined;
	let boundaryLeft: Coord | undefined;

	for (const point of points) {
		if (boundaryTop === undefined || boundaryTop.y >= point.y) {
			boundaryTop = point;
		}
		if (boundaryRight === undefined || boundaryRight.x <= point.x) {
			boundaryRight = point;
		}
		if (boundaryBottom === undefined || boundaryBottom.y <= point.y) {
			boundaryBottom = point;
		}
		if (boundaryLeft === undefined || boundaryLeft.x >= point.x) {
			boundaryLeft = point;
		}
	}

	if (boundaryTop && boundaryRight && boundaryBottom && boundaryLeft) {
		const boundaryStart: Coord = new Coord(boundaryLeft.x, boundaryTop.y);
		const boundaryEnd: Coord = new Coord(boundaryRight.x, boundaryBottom.y + 1);
		const bucket = new Map<string, Coord[]>();
		for (const point of points) {
			bucket.set(point.toString(), []);
		}
		for (let x = boundaryStart.x; x < boundaryEnd.x; x++) {
			for (let y = boundaryStart.y; y < boundaryEnd.y; y++) {
				const ordered: Coord[] = points.sort(
					(a, b) => a.manhattan(x, y) - b.manhattan(x, y),
				);
				if (ordered[0]?.manhattan(x, y) !== ordered[1]?.manhattan(x, y)) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					const b = bucket.get(ordered[0]!.toString());
					if (b) {
						b.push(new Coord(x, y));
					}
				}
			}
		}
		const bound: number[] = [];
		for (const territory of bucket.values()) {
			if (
				!territory.some(
					(point) =>
						point.x <= boundaryStart.x ||
						point.y <= boundaryStart.y ||
						point.x >= boundaryEnd.x ||
						point.y >= boundaryEnd.y - 1, // magic boundary bandaid
				)
			) {
				bound.push(territory.length);
			}
		}
		return bound.reduce((acc, next) => (next > acc ? next : acc), 0);
	} else {
		return undefined;
	}
};

await task(p1, packageJson.aoc); // 3006 ~230ms
