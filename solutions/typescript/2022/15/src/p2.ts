import { ManhattanCircle, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const p2 = (input: string): number => {
	const sensors = parse(input);
	const limit = (0).span(4000000);
	const expandedSensors = sensors.map((c) => c.clone().setRadius(c.radius + 1));

	for (const intersection of ManhattanCircle.walkIntersections(expandedSensors)) {
		if (
			limit.contains(intersection.x) &&
			limit.contains(intersection.y) &&
			sensors.every((sensor) => !sensor.contains(intersection))
		) {
			return intersection.x * 4000000 + intersection.y;
		}
	}

	return -1;
};

await task(p2, packageJson.aoc); // 12518502636475 ~0.27ms
