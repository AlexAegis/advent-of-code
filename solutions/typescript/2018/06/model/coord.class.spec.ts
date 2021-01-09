import { expect } from 'chai';
import { Coord } from './coord.class';

describe('2018 - Day 6 - Coord', () => {
	const a: Coord = new Coord(1, 1);
	const b: Coord = new Coord(3, 3);
	const c: Coord = new Coord(7, 2);

	it('should the manhattan distance between (1, 1) and (3, 3) be 4', () => {
		expect(a.manhattanCoord(b)).to.equal(4);
	});

	it('should the manhattan distance between (3, 3) and (7, 2) be 4', () => {
		expect(b.manhattanCoord(c)).to.equal(5);
	});

	it('should the that the manhattan distance is commutative', () => {
		expect(a.manhattanCoord(b)).to.equal(b.manhattanCoord(a));
		expect(a.manhattanCoord(c)).to.equal(c.manhattanCoord(a));
	});
});
