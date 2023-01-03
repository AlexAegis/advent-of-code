import { split, task } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { FerryAction, parse } from './parse.function.js';

export const p2 = (input: string): number => {
	const position = new Vec2(0, 0);
	const waypoint = new Vec2(10, 1);
	for (const { action, value } of split(input).map(parse)) {
		switch (action) {
			case FerryAction.NORTH:
				waypoint.addMut({ x: 0, y: 1 }, { times: value });
				break;
			case FerryAction.EAST:
				waypoint.addMut({ x: 1, y: 0 }, { times: value });
				break;
			case FerryAction.SOUTH:
				waypoint.addMut({ x: 0, y: -1 }, { times: value });
				break;
			case FerryAction.WEST:
				waypoint.addMut({ x: -1, y: 0 }, { times: value });
				break;
			case FerryAction.LEFT:
				waypoint.rotateLeft(value / 90);
				break;
			case FerryAction.RIGHT:
				waypoint.rotateRight(value / 90);
				break;
			case FerryAction.FORWARD:
				position.addMut(waypoint, { times: value });
				break;
		}
	}
	return Vec2.ORIGIN.manhattan(position);
};

await task(p2, packageJson.aoc); // 39140 ~1.07ms
