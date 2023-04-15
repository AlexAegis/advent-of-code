import { task } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import { parseBoundary } from './functions/parse.function.js';
import { Probe } from './model/probe.class.js';

export const p2 = (input: string): number => {
	const line = input.lines()[0];
	if (line) {
		const boundary = parseBoundary(line);
		const initialVelocities: Vec2[] = [];
		for (let x = 0; x < 500; x++) {
			for (let y = -250; y < 250; y++) {
				const initialVelocity = new Vec2(x, y);
				const probe = new Probe(initialVelocity.clone());
				stepping: while (!probe.isPastPoint(boundary.topRight)) {
					probe.step();
					if (probe.isWithin(boundary)) {
						initialVelocities.push(initialVelocity);
						break stepping;
					}
				}
			}
		}
		return initialVelocities.length;
	} else {
		return 0;
	}
};

await task(p2, packageJson.aoc); // 3202 ~75.94ms
