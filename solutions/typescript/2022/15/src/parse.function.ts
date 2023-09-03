/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ManhattanCircle, split, Vec2 } from '@alexaegis/advent-of-code-lib';

export const parse = (input: string): ManhattanCircle[] => {
	const match = /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/;
	return split(input)
		.map((line) => {
			const groups = match.exec(line);
			if (groups) {
				const [, ax, ay, bx, by] = groups;
				const sensor = new Vec2(Number.parseInt(ax!, 10), Number.parseInt(ay!, 10));
				const closestBeacon = new Vec2(Number.parseInt(bx!, 10), Number.parseInt(by!, 10));
				const range = sensor.manhattan(closestBeacon);
				return new ManhattanCircle(sensor, range);
			} else {
				throw new Error(`Line is not sensor data: ${line}`);
			}
		})
		.sort((a, b) => a.center.x - b.center.x);
};
