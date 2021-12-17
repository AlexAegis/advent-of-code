import { bench, read, split } from '@lib';
import { BoundingBox } from '@lib/functions';
import { Direction, isDirectionMarker, Vec2 } from '@lib/model';
import { day, year } from '.';

const toKeypadNumber = (vec: Vec2): number => (2 - vec.y) * 3 + vec.x + 1;

export const runner = (input: string): number => {
	const position = new Vec2(1, 1);

	const keypadArea: BoundingBox = { topLeft: Vec2.ORIGIN, bottomRight: new Vec2(2, 2) };

	const result = split(input).reduce((acc, line) => {
		line.split('')
			.filter(isDirectionMarker)
			.map(Direction.fromMarker)
			.forEach((direction) => position.addMut(direction, { limit: keypadArea }));
		return acc * 10 + toKeypadNumber(position);
	}, 0);

	return result;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 24862 ~2.6ms
}
