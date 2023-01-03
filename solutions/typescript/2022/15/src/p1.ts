import { Interval, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export interface Args {
	y: number;
}

export const p1 = (input: string, args?: Args): number => {
	const sensors = parse(input);
	// The example overrides the y level
	const y = args?.y ?? 2000000;

	return Interval.merge(sensors.map((sensor) => sensor.spanAtY(y)))
		.map((span) => span.length)
		.sum();
};

await task(p1, packageJson.aoc); // 5127797 ~0.02ms
