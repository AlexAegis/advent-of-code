import { bench, read, split } from '@lib';
import { Direction } from '@lib/model/direction.class';
import { Area, Vec2 } from '@lib/model/vec2.class';
import { day, year } from '.';

const toKeypadNumber = (vec: Vec2): number => (2 - vec.y) * 3 + vec.x + 1;

export const runner = (input: string): number => {
	const position = new Vec2(1, 1);

	const keypadArea: Area = { cornerA: Vec2.ORIGIN, cornerB: new Vec2(2, 2) };

	const result = split(input).reduce((acc, line) => {
		line.split('')
			.filter(Direction.isDirectionMarker)
			.map(Direction.from)
			.forEach((direction) => position.addMut(direction, { limit: keypadArea }));
		return acc * 10 + toKeypadNumber(position);
	}, 0);

	return result;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 24862 ~2.6ms
}
