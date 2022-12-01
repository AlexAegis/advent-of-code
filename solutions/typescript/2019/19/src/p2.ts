import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { hasBeam } from './p1.js';
import { parse } from './parse.js';

export const p2 = (input: string): number => {
	const tape = parse(input);
	const targetSide = 100 - 1;
	let prevX = 0;
	for (let y = targetSide + 1; y < 5000; y++) {
		let startedTrackingAt!: number;
		let x = prevX;
		while (startedTrackingAt === undefined) {
			if (hasBeam(tape, x, y)) {
				startedTrackingAt = x;
				prevX = x;
			} else {
				x++;
			}
		}

		if (hasBeam(tape, x + targetSide, y - targetSide)) {
			return x * 10000 + y - targetSide;
		}
	}

	return 0;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 17302065 ~905ms
}
