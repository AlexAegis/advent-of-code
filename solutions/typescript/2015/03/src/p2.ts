import { bench, read } from '@alexaegis/advent-of-code-lib';
import {
	DirectionMarker,
	directionMarkerAssociationMap,
	Vec2,
} from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number =>
	input.split('').reduce(
		(acc, next) => {
			const c = acc.isRobot ? acc.roboCurrent : acc.current;
			c.addMut(directionMarkerAssociationMap[next as DirectionMarker]);
			const cs = c.toString();
			acc.locations.set(cs, (acc.locations.get(cs) || 0) + 1);
			acc.isRobot = !acc.isRobot;
			return acc;
		},
		{
			locations: new Map<string, number>([[new Vec2(0, 0).toString(), 2]]),
			current: new Vec2(0, 0),
			roboCurrent: new Vec2(0, 0),
			isRobot: false,
		}
	).locations.size;

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 2631 ~2.8ms
}
