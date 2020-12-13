import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2019 - Day 22 - Part One', () => {
	it('should solve the input', async () => {
		expect(await runner()((await read(year, day)()).input)).to.equal(6831);
	});

	it('should solve for the first example', async () => {
		expect(await runner()((await read(year, day, 'example.1.txt')()).input)).to.equal(4126);
	});

	it('should solve for the second example', async () => {
		expect(await runner()((await read(year, day, 'example.2.txt')()).input)).to.equal(5922);
	});

	it('should solve for the third example', async () => {
		expect(await runner()((await read(year, day, 'example.3.txt')()).input)).to.equal(7115);
	});

	it('should solve for the fourth example', async () => {
		expect(await runner()((await read(year, day, 'example.4.txt')()).input)).to.equal(1219);
	});
});
