import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { getMyClarifiedTicket, runner } from './part_two';

describe('2020 - Day 16 - Part Two', () => {
	it('should solve the input', async () => {
		expect(runner((await read(year, day)()).input)).to.equal(3173135507987);
	});

	it('should solve the first example', async () => {
		const input = (await read(year, day, 'example.2.txt')()).input;
		expect(
			getMyClarifiedTicket(input).every(
				(field) =>
					(field.fieldName === 'class' && field.value === 12) ||
					(field.fieldName === 'row' && field.value === 11) ||
					(field.fieldName === 'seat' && field.value === 13)
			)
		).to.be.true;
	});
});
