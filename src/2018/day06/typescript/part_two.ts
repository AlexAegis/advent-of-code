import { Coord } from './model/coord.class';
import { interpret } from './interpret.function';
import { bench, reader } from '@root';
import { year, day, Args } from '.';

/**
 *
 * @param input in this task the input is slightly modified. There were extra data in the
 * description of the task so I added that as the first line of the input.
 */
export const runner = async (input: string, args: Args): Promise<number> => {
	const points = await interpret(input);
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
	let area = 0;
	for (let x = boundaryStart.x; x < boundaryEnd.x; x++) {
		for (let y = boundaryStart.y; y < boundaryEnd.y; y++) {
			if (points.map(a => a.manhattan(x, y)).reduce((acc, next) => (acc += next)) < args.limit) {
				area++;
			}
		}
	}
	return area;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 42998 ~48ms
}
