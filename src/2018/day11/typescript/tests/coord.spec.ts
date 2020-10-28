import { expect } from 'chai';
import { Coord } from '../model/coord.class';

describe('Day 11, Coord neightbour iterator', () => {
	it('Should be only 9 of them:', () => {
		const c = new Coord(1, 1);
		expect([...c].length).to.equal(9);
	});
});
