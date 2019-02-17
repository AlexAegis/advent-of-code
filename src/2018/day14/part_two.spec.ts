import { runner } from './part_two';
import { expect } from 'chai';

describe('Day 14, Part Two', () => {
	it('Should take 9 recipes for 5158916779 to appear:', async () => {
		expect(await runner('5158916779')).to.equal(9);
	});
	it('Should take 9 recipes for 51589 to appear:', async () => {
		expect(await runner('51589')).to.equal(9);
	});
	it('Should take 5 recipes for 0124515891 to appear:', async () => {
		expect(await runner('0124515891')).to.equal(5);
	});
	it('Should take 5 recipes for 01245 to appear:', async () => {
		expect(await runner('01245')).to.equal(5);
	});
	it('Should take 18 recipes for 9251071085 to appear:', async () => {
		expect(await runner('9251071085')).to.equal(18);
	});
	it('Should take 18 recipes for 92510 to appear:', async () => {
		expect(await runner('92510')).to.equal(18);
	});
	it('Should take 2018 recipes for 5941429882 to appear:', async () => {
		expect(await runner('5941429882')).to.equal(2018);
	});
	it('Should take 2018 recipes for 59414 to appear:', async () => {
		expect(await runner('59414')).to.equal(2018);
	});
	it('Should take 20229822 recipes for 327901 to appear:', async function() {
		this.timeout(10000);
		expect(await runner()).to.equal(20229822);
	});
});
