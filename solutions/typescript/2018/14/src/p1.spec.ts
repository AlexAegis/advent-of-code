import { describe, expect, it } from 'vitest';
import { runner } from './p1.js';

describe(`2018 - Day 14 - Part One`, () => {
	it(`should resolve to 1115317115 when using the input`, async () => {
		expect(runner(327901)).to.equal('1115317115');
	});

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
});
