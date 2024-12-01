import { task } from '@alexaegis/advent-of-code-lib';
import {
	Vec2,
	directionMarkerAssociationMap,
	type DirectionMarker,
	type Vec2String,
} from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	[...input].reduce(
		(acc, next) => {
			acc.current.addMut(directionMarkerAssociationMap[next as DirectionMarker]);
			const c = acc.current.toString();
			acc.locations.set(c, (acc.locations.get(c) ?? 0) + 1);
			return acc;
		},
		{
			locations: new Map<Vec2String, number>([[new Vec2(0, 0).toString(), 1]]),
			current: new Vec2(0, 0),
		},
	).locations.size;

await task(p1, packageJson.aoc); // 2572 ~2.6ms
