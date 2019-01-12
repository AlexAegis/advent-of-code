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

		let maxDistance = input === 'example' ? 32 : 10000;
		let area = 0;
		for (let x = boundaryStart.x; x < boundaryEnd.x; x++) {
			for (let y = boundaryStart.y; y < boundaryEnd.y; y++) {
				if (points.map(a => a.manhattan(x, y)).reduce((acc, next) => (acc += next)) < maxDistance) {
					area++;
				}
			}
		}
		res(area);
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`Result: ${await runner()}`);
		console.timeEnd();
	})(); // 42998 ~66ms
}
