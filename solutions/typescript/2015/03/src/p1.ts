import { bench, read } from '@alexaegis/advent-of-code-lib';
import {
	DirectionMarker,
	directionMarkerAssociationMap,
	Vec2,
	Vec2String,
} from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number =>
	input.split('').reduce(
		(acc, next) => {
			acc.current.addMut(directionMarkerAssociationMap[next as DirectionMarker]);
			const c = acc.current.toString();
			acc.locations.set(c, (acc.locations.get(c) || 0) + 1);
			return acc;
		},
		{
			locations: new Map<Vec2String, number>([[new Vec2(0, 0).toString(), 1]]),
			current: new Vec2(0, 0),
		}
	).locations.size;

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 2572 ~2.6ms
}
