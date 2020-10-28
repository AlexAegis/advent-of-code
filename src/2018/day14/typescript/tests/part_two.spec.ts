import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe(`2018 - Day 14 - Part Two`, () => {
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

	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(runner('327901')).to.equal(results.two.input);
	}).timeout(20000);
});
