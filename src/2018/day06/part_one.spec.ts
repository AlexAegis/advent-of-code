import { Coord } from './part_one';

describe('Day 6, Part One', () => {
	const a: Coord = new Coord(1, 1);
	const b: Coord = new Coord(3, 3);
	const c: Coord = new Coord(7, 2);

	it('should the manhattan distance between (1, 1) and (3, 3) be 4', async () => {
		expect(a.manhattan(b)).toEqual(4);
	});

	it('should the manhattan distance between (3, 3) and (7, 2) be 4', async () => {
		expect(b.manhattan(c)).toEqual(5);
	});

	it('should the that the manhattan distance is commutative', async () => {
		expect(a.manhattan(b)).toEqual(b.manhattan(a));
		expect(a.manhattan(c)).toEqual(c.manhattan(a));
	});
});
