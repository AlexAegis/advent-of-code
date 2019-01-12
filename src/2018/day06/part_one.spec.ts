import { runner, Coord } from './part_one';

describe('Day 6, Part One', () => {
	const a: Coord = new Coord(1, 1);
	const b: Coord = new Coord(3, 3);
	const c: Coord = new Coord(7, 2);

	it('should the manhattan distance between (1, 1) and (3, 3) be 4', async () => {
		expect(a.manhattanCoord(b)).toEqual(4);
	});

	it('should the manhattan distance between (3, 3) and (7, 2) be 4', async () => {
		expect(b.manhattanCoord(c)).toEqual(5);
	});

	it('should the that the manhattan distance is commutative', async () => {
		expect(a.manhattanCoord(b)).toEqual(b.manhattanCoord(a));
		expect(a.manhattanCoord(c)).toEqual(c.manhattanCoord(a));
	});

	it('should the example resolve to 17', async () => {
		expect(await runner('example')).toEqual(17);
	});

	it('should the input resolve to XX', async () => {
		expect(await runner('input')).toEqual(3006);
	});
});
