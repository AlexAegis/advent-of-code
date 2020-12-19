import { bench, read, split } from '@lib';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';
import { FerryAction, parse } from './parse.function';

export const runner = (input: string): number => {
	const position = new Vec2(0, 0);
	const vector = new Vec2(1, 0);
	for (const { action, value } of split(input).map(parse)) {
		switch (action) {
			case FerryAction.NORTH:
				position.addMut(Direction.NORTH, { times: value });
				break;
			case FerryAction.EAST:
				position.addMut(Direction.EAST, { times: value });
				break;
			case FerryAction.SOUTH:
				position.addMut(Direction.SOUTH, { times: value });
				break;
			case FerryAction.WEST:
				position.addMut(Direction.WEST, { times: value });
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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 858 ~1.07ms
}
