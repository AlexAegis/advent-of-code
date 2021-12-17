import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { parseBoundary } from './functions';
import { Probe } from './model';

export const runner = (input: string): number => {
	const line = input.lines()[0];
	const boundary = parseBoundary(line);
	const initialVelocities: Vec2[] = [];
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
					initialVelocities.push(initialVelocity);
					break stepping;
				}
			}
		}
	}
	return initialVelocities.length;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3202 ~75.94ms
}
