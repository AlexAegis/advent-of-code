import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpret } from './interpret.function.js';
import type { Args } from './model/args.interface.js';
import { Coord } from './model/coord.class.js';

/**
 *
 * @param input in this task the input is slightly modified. There were extra data in the
 * description of the task so I added that as the first line of the input.
 */
export const p2 = (input: string, args: Args | undefined): number | undefined => {
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
		let area = 0;
		for (let x = boundaryStart.x; x < boundaryEnd.x; x++) {
			for (let y = boundaryStart.y; y < boundaryEnd.y; y++) {
				if (
					points.map((a) => a.manhattan(x, y)).reduce((acc, next) => (acc += next)) <
					(args ? args.limit : 0)
				) {
					area++;
				}
			}
		}
		return area;
	} else {
		return undefined;
	}
};

if (process.env.RUN) {
	const resources = await loadTaskResources<Args>(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 42998 ~46ms
}
