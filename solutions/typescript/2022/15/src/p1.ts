import { Interval, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export interface Args {
	y: number;
}

export const p1 = (input: string, args?: Args): number => {
	const sensors = parse(input);
	// The example overrides the y level
	const y = args?.y ?? 2_000_000;

	return Interval.merge(sensors.map((sensor) => sensor.rowAt(y)))
		.map((interval) => interval.length - 1) // - 1 is the beacon itself
		.sum();
};

await task(p1, packageJson.aoc); // 5127797 ~0.02ms
