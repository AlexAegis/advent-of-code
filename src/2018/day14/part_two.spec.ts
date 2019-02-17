import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 14, Part Two', () => {
	it('Should be 5158916779 after 9 recipe:', async () => {
		expect((await runner(9)).toString()).to.equal('5158916779');
	});
});
