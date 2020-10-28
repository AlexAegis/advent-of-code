import { bench, read } from '@lib';
import { day, year } from '.';
import { interpret } from './interpret.function';
import { Coord } from './model/coord.class';

export const runner = (input: string): number | undefined => {
	const points = interpret(input);
	let boundaryTop: Coord | undefined;
	let boundaryRight: Coord | undefined;
	let boundaryBottom: Coord | undefined;
	let boundaryLeft: Coord | undefined;

	points.forEach((point) => {
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
	});

	if (boundaryTop && boundaryRight && boundaryBottom && boundaryLeft) {
		const boundaryStart: Coord = new Coord(boundaryLeft.x, boundaryTop.y);
		const boundaryEnd: Coord = new Coord(boundaryRight.x, boundaryBottom.y + 1);
		const bucket: Map<string, Coord[]> = new Map();
		for (const point of points) {
			bucket.set(point.toString(), []);
		}
		for (let x = boundaryStart.x; x < boundaryEnd.x; x++) {
			for (let y = boundaryStart.y; y < boundaryEnd.y; y++) {
				const ordered: Coord[] = points.sort(
					(a, b) => a.manhattan(x, y) - b.manhattan(x, y)
				);
				if (ordered[0].manhattan(x, y) !== ordered[1].manhattan(x, y)) {
					const b = bucket.get(ordered[0].toString());
					if (b) {
						b.push(new Coord(x, y));
					}
				}
			}
		}
		const bound: number[] = [];
		bucket.forEach((territory) => {
			if (
				!territory.some(
					(point) =>
						point.x <= boundaryStart.x ||
						point.y <= boundaryStart.y ||
						point.x >= boundaryEnd.x ||
						point.y >= boundaryEnd.y - 1 // magic boundary bandaid
				)
			) {
				bound.push(territory.length);
			}
		});
		return bound.reduce((acc, next) => (acc === undefined || next > acc ? next : acc));
	} else {
		return undefined;
	}
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3006 ~230ms
}
