import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import { Direction, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { FerryAction, parse } from './parse.function.js';

export const runner = (input: string): number => {
	const position = new Vec2(0, 0);
	const waypoint = new Vec2(10, 1);
	for (const { action, value } of split(input).map(parse)) {
		switch (action) {
			case FerryAction.NORTH:
				waypoint.addMut(Direction.NORTH, { times: value });
				break;
			case FerryAction.EAST:
				waypoint.addMut(Direction.EAST, { times: value });
				break;
			case FerryAction.SOUTH:
				waypoint.addMut(Direction.SOUTH, { times: value });
				break;
			case FerryAction.WEST:
				waypoint.addMut(Direction.WEST, { times: value });
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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 39140 ~1.07ms
}
