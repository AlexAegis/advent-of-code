import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2020 - Day 15 - Part One', () => {
	it('should solve for the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(1015);
	});

	it('should solve for the first example', async () => {
		expect(await runner('0,3,6')).to.equal(436);
	});

	it('should solve for the second example', async () => {
		expect(await runner('1,3,2')).to.equal(1);
	});

	it('should solve for the third example', async () => {
		expect(await runner('2,1,3')).to.equal(10);
	});

	it('should solve for the fourth example', async () => {
		expect(await runner('1,2,3')).to.equal(27);
	});

	it('should solve for the fifth example', async () => {
		expect(await runner('2,3,1')).to.equal(78);
	});

	it('should solve for the sixth example', async () => {
		expect(await runner('3,2,1')).to.equal(438);
	});

	it('should solve for the seventh example', async () => {
		expect(await runner('3,1,2')).to.equal(1836);
	});
});
