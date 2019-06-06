import { runner } from '../part_one';
import { expect } from 'chai';
import { year, day, results } from '..';

describe(`${year} - Day ${day} - Part One`, () => {
	it('Should be 5158916779 after 9 recipe:', async () => {
		expect((await runner(9)).toString()).to.equal('5158916779');
	});

	it('Should be 0124515891 after 5 recipe:', async () => {
		expect((await runner(5)).toString()).to.equal('0124515891');
	});

	it('Should be 9251071085 after 18 recipe:', async () => {
		expect((await runner(18)).toString()).to.equal('9251071085');
	});
	it('Should be 5941429882 after 2018 recipe:', async () => {
		expect((await runner(2018)).toString()).to.equal('5941429882');
	});

	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(runner(327901)).to.equal(results.one.input);
	});
});
