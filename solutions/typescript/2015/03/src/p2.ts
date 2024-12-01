import { task } from '@alexaegis/advent-of-code-lib';
import {
	Vec2,
	directionMarkerAssociationMap,
	type DirectionMarker,
} from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number =>
	[...input].reduce(
		(acc, next) => {
			const c = acc.isRobot ? acc.roboCurrent : acc.current;
			c.addMut(directionMarkerAssociationMap[next as DirectionMarker]);
			const cs = c.toString();
			acc.locations.set(cs, (acc.locations.get(cs) ?? 0) + 1);
			acc.isRobot = !acc.isRobot;
			return acc;
		},
		{
			locations: new Map<string, number>([[new Vec2(0, 0).toString(), 2]]),
			current: new Vec2(0, 0),
			roboCurrent: new Vec2(0, 0),
			isRobot: false,
		},
	).locations.size;

await task(p2, packageJson.aoc); // 2631 ~2.8ms
