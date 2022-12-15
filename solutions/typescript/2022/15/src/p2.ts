import { BoundingBox, Direction, task, Vec2 } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { getEffectiveRange, isWithinRange, parse } from './sensors.function.js';

export const p2 = (input: string): number => {
	const sensorData = parse(input);
	const sensorPositions = sensorData.map((l) => l.sensor);
	const sensorArea = new BoundingBox(sensorPositions);

	const getEffectiveRangeOfAllSensors = (pos: Vec2): number =>
		sensorData.map((sensor) => getEffectiveRange(sensor, pos)).max();

	const check = (position: Vec2): boolean => {
		const notWithinRange = sensorData.every((sensor) => !isWithinRange(sensor, position));
		return (
			notWithinRange &&
			Direction.cardinalDirections.every((direction) =>
				sensorData.some((sensor) => isWithinRange(sensor, position.add(direction)))
			)
		);
	};

	let checks = 0;
	// TODO: PERF skip y levels when possible
	for (let y = sensorArea.bottom; y < sensorArea.top; y++) {
		for (let x = sensorArea.left; x < sensorArea.right; x++) {
			checks++;
			const pos = new Vec2(x, y);
			const effectiveRange = getEffectiveRangeOfAllSensors(pos);
			if (check(pos)) {
				return pos.x * 4000000 + pos.y;
			}
			x += effectiveRange;
		}
	}

	console.log('checks', checks);

	return -1;
};

await task(p2, packageJson.aoc); // 12518502636475 ~70s
