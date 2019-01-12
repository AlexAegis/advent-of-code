import { Coord } from './coord.class';
import { reader } from './reader.function';

export const runner = async (input: 'example' | 'input' = 'input'): Promise<number> =>
	new Promise<number>(async res => {
		const points = await reader(input);
		let boundaryTop: Coord;
		let boundaryRight: Coord;
		let boundaryBottom: Coord;
		let boundaryLeft: Coord;

		points.forEach(point => {
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

		const boundaryStart: Coord = new Coord(boundaryLeft.x, boundaryTop.y);
		const boundaryEnd: Coord = new Coord(boundaryRight.x, boundaryBottom.y + 1);
		const bucket: Map<string, Array<Coord>> = new Map();
		for (let point of points) {
			bucket.set(point.toString(), []);
		}
		for (let x = boundaryStart.x; x < boundaryEnd.x; x++) {
			for (let y = boundaryStart.y; y < boundaryEnd.y; y++) {
				let ordered: Array<Coord> = points.sort((a, b) => a.manhattan(x, y) - b.manhattan(x, y));
				if (ordered[0].manhattan(x, y) !== ordered[1].manhattan(x, y)) {
					bucket.get(ordered[0].toString()).push(new Coord(x, y));
				}
			}
		}
		const bound: Array<number> = [];
		bucket.forEach(territory => {
			if (
				!territory.some(
					point =>
						point.x <= boundaryStart.x ||
						point.y <= boundaryStart.y ||
						point.x >= boundaryEnd.x ||
						point.y >= boundaryEnd.y - 1 // magic boundary bandaid
				)
			) {
				bound.push(territory.length);
			}
		});
		res(bound.reduce((acc, next) => (acc === undefined || next > acc ? next : acc)));
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`Result: ${await runner()}`);
		console.timeEnd();
	})(); // 3006 ~272ms
}
