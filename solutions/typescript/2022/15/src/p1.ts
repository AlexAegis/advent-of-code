import { Span, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { getEffectiveRange, parse, SensorData } from './sensors.function.js';

export const getSensorSpanAtY = (sensorData: SensorData, y: number): Span => {
	const effectiveRange = getEffectiveRange(sensorData, { x: sensorData.sensor.x, y });
	return new Span(sensorData.sensor.x - effectiveRange, sensorData.sensor.x + effectiveRange);
};

export interface Args {
	y: number;
}

export const p1 = (input: string, args?: Args): number => {
	const sensors = parse(input);
	// The example overrides the y level
	const y = args?.y ?? 2000000;

	return Span.merge(sensors.map((sensor) => getSensorSpanAtY(sensor, y)))
		.map((span) => span.length)
		.sum();
};

await task(p1, packageJson.aoc); // 5127797 ~1710.55ms
