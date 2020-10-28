import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`2019 - Day 3 - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first example resolves to 610', async () => {
		expect(await runner('R8,U5,L5,D3\nU7,R6,D4,L4')).to.equal(6);
	});

	it('should be that that the second example resolves to 159', async () => {
		expect(await runner('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83')).to.equal(159);
	});

	it('should be that that the third example resolves to 135', async () => {
		expect(
			await runner('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7')
		).to.equal(135);
	});
});
