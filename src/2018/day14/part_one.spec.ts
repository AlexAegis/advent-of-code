import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 14, Part One', () => {
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

	it('Should be 1115317115 after 327901 recipe:', async () => {
		expect((await runner()).toString()).to.equal('1115317115');
	});
});
