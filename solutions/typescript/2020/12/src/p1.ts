import { split, task } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { FerryAction, parse } from './parse.function.js';

export const p1 = (input: string): number => {
	const position = new Vec2(0, 0);
	const vector = new Vec2(1, 0);
	for (const { action, value } of split(input).map(parse)) {
		switch (action) {
			case FerryAction.NORTH:
				position.addMut({ x: 0, y: 1 }, { times: value });
				break;
			case FerryAction.EAST:
				position.addMut({ x: 1, y: 0 }, { times: value });
				break;
			case FerryAction.SOUTH:
				position.addMut({ x: 0, y: -1 }, { times: value });
				break;
			case FerryAction.WEST:
				position.addMut({ x: -1, y: 0 }, { times: value });
				break;
			case FerryAction.LEFT:
				vector.rotateLeft(value / 90);
				break;
			case FerryAction.RIGHT:
				vector.rotateRight(value / 90);
				break;
			case FerryAction.FORWARD:
				position.addMut(vector, { times: value });
				break;
		}
	}
	return Vec2.ORIGIN.manhattan(position);
};

await task(p1, packageJson.aoc); // 858 ~1.07ms
