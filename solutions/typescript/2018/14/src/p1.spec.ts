import { describe, expect, it } from 'vitest';
import { p1 } from './p1.js';

describe('2018 - Day 14 - Part One', () => {
	it('should resolve to 1115317115 when using the input', () => {
		expect(p1(327_901)).toEqual('1115317115');
	});

	it('Should be 5158916779 after 9 recipe:', () => {
		expect(p1(9)).toEqual('5158916779');
	});

	it('Should be 0124515891 after 5 recipe:', () => {
		expect(p1(5)).toEqual('0124515891');
	});

	it('Should be 9251071085 after 18 recipe:', () => {
		expect(p1(18)).toEqual('9251071085');
	});
	it('Should be 5941429882 after 2018 recipe:', () => {
		expect(p1(2018)).toEqual('5941429882');
	});
});
