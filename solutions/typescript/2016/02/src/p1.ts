import { split } from '@alexaegis/advent-of-code-lib';
import type { BoundingBox } from '@alexaegis/advent-of-code-lib/model';
import { Direction, isDirectionMarker, Vec2 } from '@alexaegis/advent-of-code-lib/model';
import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const toKeypadNumber = (vec: Vec2): number => (2 - vec.y) * 3 + vec.x + 1;

export const p1 = (input: string): number => {
	const position = new Vec2(1, 1);

	const keypadArea: BoundingBox = {
		topLeft: Vec2.ORIGIN,
		bottomRight: new Vec2(2, 2),
	};

	const result = split(input).reduce((acc, line) => {
		line.split('')
			.filter(isDirectionMarker)
			.map(Direction.fromMarker)
			.forEach((direction) => position.addMut(direction, { limit: keypadArea }));
		return acc * 10 + toKeypadNumber(position);
	}, 0);

	return result;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 24862 ~2.6ms
}
