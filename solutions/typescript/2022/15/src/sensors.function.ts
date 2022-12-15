import { split, Vec2, Vec2Like } from '@alexaegis/advent-of-code-lib';

export interface SensorData {
	sensor: Vec2;
	range: number;
}

export const parse = (input: string): SensorData[] => {
	const match =
		/^Sensor at x=(-?[\d]+), y=(-?[\d]+): closest beacon is at x=(-?[\d]+), y=(-?[\d]+)$/;
	return split(input)
		.map((line) => {
			const groups = match.exec(line);
			if (groups) {
				const [, ax, ay, bx, by] = groups;
				const sensor = new Vec2(parseInt(ax, 10), parseInt(ay, 10));
				const closestBeacon = new Vec2(parseInt(bx, 10), parseInt(by, 10));
				const range = sensor.manhattan(closestBeacon);
				return {
					sensor,
					range,
				} as SensorData;
			} else {
				throw new Error(`Line is not sensor data ${line}`);
			}
		})
		.sort((a, b) => a.sensor.x - b.sensor.x);
};

/**
 * The 'range' of S is 3 in manhattan distance. The effective range at point 'e'
 * is then 1, because from 'e', at most at 1 manhattan distance is every point
 * covered by the range of S.
 *
 * ...#....
 * ..###...
 * .#####..
 * ###S###.
 * .###e#..
 * ..###...
 * ...#..f.
 *
 * Similarly the effective range of S at f is 0 because it's outside the range
 * of S
 */
export const getEffectiveRange = (sensorData: SensorData, pos: Vec2Like): number => {
	return Math.max(sensorData.range - sensorData.sensor.manhattan(pos), 0);
};

export const isWithinRange = (sensorData: SensorData, pos: Vec2) =>
	sensorData.sensor.manhattan(pos) <= sensorData.range;

export function* walkEdges(sensorData: SensorData[]): Generator<Vec2> {
	for (const data of sensorData) {
		yield* data.sensor.generateVectorsAroundInManhattanRadius(data.range + 1);
	}
}
