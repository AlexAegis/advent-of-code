import { task } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import { parseBoundary } from './functions/parse.function.js';
import { Probe } from './model/probe.class.js';

export const p1 = (input: string): number => {
	const line = input.lines()[0]!;
	const boundary = parseBoundary(line);
	let result = 0;
	for (let x = 0; x < 500; x++) {
		for (let y = -250; y < 250; y++) {
			const initialVelocity = new Vec2(x, y);
			const probe = new Probe(initialVelocity.clone());
			let maxYposition: number | undefined = undefined;
			stepping: while (!probe.isPastPoint(boundary.topRight)) {
				probe.step();
				if (!maxYposition || probe.position.y > maxYposition) {
					maxYposition = probe.position.y;
				}
				if (probe.isWithin(boundary)) {
					if (maxYposition > result) {
						result = maxYposition;
					}
					break stepping;
				}
			}
		}
	}
	return result;
};

await task(p1, packageJson.aoc); // 5995 ~73.71ms
