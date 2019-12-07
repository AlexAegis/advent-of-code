import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that both the first examples resolves to 43210', async () => {
		expect(await runner('3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0')).to.equal(43210);
	});

	it('should be that that both the first examples resolves to 54321', async () => {
		expect(await runner('3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0')).to.equal(
			54321
		);
	});

	it('should be that that both the first examples resolves to 54321', async () => {
		expect(
			await runner(
				'3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'
			)
		).to.equal(65210);
	});
});
