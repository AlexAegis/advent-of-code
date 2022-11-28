import { describe, expect, it } from 'vitest';
import { runner } from './p2.js';

describe('2018 - Day 14 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			expect(runner('327901')).to.equal(20229822);
		},
		{ timeout: 20000 }
	);

	it('Should take 9 recipes for 5158916779 to appear:', async () => {
		expect(runner('5158916779')).to.equal(9);
	});

	it('Should take 9 recipes for 51589 to appear:', async () => {
		expect(runner('51589')).to.equal(9);
	});

	it('Should take 5 recipes for 0124515891 to appear:', async () => {
		expect(runner('0124515891')).to.equal(5);
	});

	it('Should take 5 recipes for 01245 to appear:', async () => {
		expect(runner('01245')).to.equal(5);
	});

	it('Should take 18 recipes for 9251071085 to appear:', async () => {
		expect(runner('9251071085')).to.equal(18);
	});

	it('Should take 18 recipes for 92510 to appear:', async () => {
		expect(runner('92510')).to.equal(18);
	});

	it('Should take 2018 recipes for 5941429882 to appear:', async () => {
		expect(runner('5941429882')).to.equal(2018);
	});

	it('Should take 2018 recipes for 59414 to appear:', async () => {
		expect(runner('59414')).to.equal(2018);
	});
});
