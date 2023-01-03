import { split, task } from '@alexaegis/advent-of-code-lib';
import {
	BoundingBox,
	Direction,
	isDirectionMarker,
	Vec2,
} from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

const toKeypadNumber = (vec: Vec2): number => (2 - vec.y) * 3 + vec.x + 1;

export const p1 = (input: string): number => {
	const position = new Vec2(1, 1);

	const keypadArea = BoundingBox.fromVectors(Vec2.ORIGIN, new Vec2(2, 2));

	const result = split(input).reduce((acc, line) => {
		line.split('')
			.filter(isDirectionMarker)
			.map((marker) => Direction.fromMarker(marker).reverse('v'))
			.forEach((direction) => position.addMut(direction, { limit: keypadArea }));
		return acc * 10 + toKeypadNumber(position);
	}, 0);

	return result;
};

await task(p1, packageJson.aoc); // 24862 ~2.6ms
