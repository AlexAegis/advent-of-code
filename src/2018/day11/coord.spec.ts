import { Coord } from './coord.class';

describe('Day 11, Coord neightbour iterator', () => {
	it('Should be only 9 of them:', async () => {
		let c = new Coord(1, 1);
		let count = 0;
		for (let n of c) {
			count++;
		}
		expect(count).toEqual(9);
	});
});
