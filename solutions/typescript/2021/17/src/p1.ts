import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parseBoundary } from './functions/parse.function.js';
import { Probe } from './model/probe.class.js';

export const p1 = (input: string): number => {
	const line = input.lines()[0];
	const boundary = parseBoundary(line);
	let result = 0;
	for (let x = 0; x < 500; x++) {
		for (let y = -250; y < 250; y++) {
			const initialVelocity = new Vec2(x, y);
			const probe = new Probe(initialVelocity.clone());
			let maxYposition = undefined;
			stepping: while (!probe.isPastPoint(boundary.bottomRight)) {
				const position = probe.step();
				if (!maxYposition || position.y > maxYposition.y) {
					maxYposition = position;
				}
				if (probe.isWithin(boundary)) {
					if (maxYposition.y > result) {
						result = maxYposition.y;
					}
					break stepping;
				}
			}
		}
	}
	return result;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 5995 ~73.71ms
}
