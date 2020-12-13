import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '..';
import { runner } from '../part_two';

describe('2019 - Day 8 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(
			'\n#`````##``#```##``#`###``\n#````#``#`#```##``#`#``#`\n#````#`````#`#`####`###``\n#````#`##```#``#``#`#``#`\n#````#``#```#``#``#`#``#`\n####``###```#``#``#`###``\n'
		);
	});
});
