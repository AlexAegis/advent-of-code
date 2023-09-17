import { describe, expect, it } from 'vitest';
import { p2 } from './p2.js';

describe('2018 - Day 14 - Part Two', () => {
	it(
		'should solve the input',
		() => {
			expect(p2('327901')).toEqual(20_229_822);
		},
		{ timeout: 20_000 },
	);

	it('Should take 9 recipes for 5158916779 to appear:', () => {
		expect(p2('5158916779')).toEqual(9);
	});

	it('Should take 9 recipes for 51589 to appear:', () => {
		expect(p2('51589')).toEqual(9);
	});

	it('Should take 5 recipes for 0124515891 to appear:', () => {
		expect(p2('0124515891')).toEqual(5);
	});

	it('Should take 5 recipes for 01245 to appear:', () => {
		expect(p2('01245')).toEqual(5);
	});

	it('Should take 18 recipes for 9251071085 to appear:', () => {
		expect(p2('9251071085')).toEqual(18);
	});

	it('Should take 18 recipes for 92510 to appear:', () => {
		expect(p2('92510')).toEqual(18);
	});

	it('Should take 2018 recipes for 5941429882 to appear:', () => {
		expect(p2('5941429882')).toEqual(2018);
	});

	it('Should take 2018 recipes for 59414 to appear:', () => {
		expect(p2('59414')).toEqual(2018);
	});
});
