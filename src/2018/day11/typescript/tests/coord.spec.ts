import { Coord } from '../model/coord.class';
import { expect } from 'chai';

describe('Day 11, Coord neightbour iterator', () => {
	it('Should be only 9 of them:', () => {
		let c = new Coord(1, 1);
		let count = 0;
		for (const _ of c) {
			count++;
		}
		expect(count).to.equal(9);
	});
});
