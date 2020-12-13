import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe('2019 - Day 4 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the first example resolves to 1', async () => {
		expect(await runner('112233-112233')).to.equal(1);
	});

	it('should be that that the second example resolves to 0', async () => {
		expect(await runner('123444-123444')).to.equal(0);
	});

	it('should be that that the third example resolves to 1', async () => {
		expect(await runner('111122-111122')).to.equal(1);
	});
});
