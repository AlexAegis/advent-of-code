import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2020 - Day 15 - Part Two', () => {
	it('should solve for the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(201);
	}).timeout(20000);

	it('should solve for the first example', () => {
		expect(runner('0,3,6')).to.equal(175594);
	}).timeout(20000);

	it('should solve for the second example', () => {
		expect(runner('1,3,2')).to.equal(2578);
	}).timeout(20000);

	it('should solve for the third example', () => {
		expect(runner('2,1,3')).to.equal(3544142);
	}).timeout(20000);

	it('should solve for the fourth example', () => {
		expect(runner('1,2,3')).to.equal(261214);
	}).timeout(20000);

	it('should solve for the fifth example', () => {
		expect(runner('2,3,1')).to.equal(6895259);
	}).timeout(20000);

	it('should solve for the sixth example', () => {
		expect(runner('3,2,1')).to.equal(18);
	}).timeout(20000);

	it('should solve for the seventh example', () => {
		expect(runner('3,1,2')).to.equal(362);
	}).timeout(20000);
});
