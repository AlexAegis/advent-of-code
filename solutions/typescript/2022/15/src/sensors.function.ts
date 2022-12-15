import { split, Vec2 } from '@alexaegis/advent-of-code-lib';

export interface SensorData {
	sensor: Vec2;
	closestBeacon: Vec2;
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
					closestBeacon,
					range,
				} as SensorData;
			} else {
				throw new Error(`Line is not sensor data ${line}`);
			}
		})
		.sort((a, b) => a.sensor.x - b.sensor.x);
};

export const getEffectiveRange = (sensorData: SensorData, pos: Vec2): number => {
	return Math.max(sensorData.range - sensorData.sensor.manhattan(pos), 0);
};

export const isWithinRange = (sensorData: SensorData, pos: Vec2) =>
	sensorData.sensor.manhattan(pos) <= sensorData.range;
