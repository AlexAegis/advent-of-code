import { BoundingBox, task, Vec2 } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { isWithinRange, parse } from './sensors.function.js';

export interface Args {
	y: number;
}

export const p1 = (input: string, args?: Args): number => {
	const sensors = parse(input);
	const greatestRange = sensors.map((l) => l.range).max();
	const extendedSensorArea = new BoundingBox(
		sensors.flatMap((l) => [
			l.sensor,
			l.sensor.add({ x: -greatestRange, y: 0 }),
			l.sensor.add({ x: greatestRange, y: 0 }),
		])
	);
	// The example overrides the y level
	const y = args?.y ?? 2000000;
	let count = 0;
	// TODO: PERF speed up using stuff from p2
	for (let x = extendedSensorArea.left; x < extendedSensorArea.right; x++) {
		const pos = new Vec2(x, y);

		if (sensors.some((s) => isWithinRange(s, pos) && !s.closestBeacon.equals(pos))) {
			count++;
		}
	}

	return count;
};

await task(p1, packageJson.aoc); // 5127797 ~1710.55ms
