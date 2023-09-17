import { describe, expect, it } from 'vitest';
import { integerLength, integerLengthMath } from './integer-length.function.js';

describe('Integer length', () => {
	it('should work with numbers larger than 1', () => {
		expect(integerLength(123)).toEqual(3);
		expect(integerLength(7653)).toEqual(4);
		expect(integerLength(85_476_847)).toEqual(8);
	});

	it('should work with 1', () => {
		expect(integerLength(1)).toEqual(1);
	});

	it('should work with 0', () => {
		expect(integerLength(0)).toEqual(1);
	});

	it('should work with negative numbers', () => {
		expect(integerLength(-34_312)).toEqual(5);
	});
});

describe('Integer length (Math)', () => {
	it('should work with numbers larger than 1', () => {
		expect(integerLengthMath(123)).toEqual(3);
		expect(integerLengthMath(7653)).toEqual(4);
		expect(integerLengthMath(85_476_847)).toEqual(8);
	});

	it('should work with 1', () => {
		expect(integerLengthMath(1)).toEqual(1);
	});

	it('should work with 0', () => {
		expect(integerLengthMath(0)).toEqual(0);
	});

	it('should work with negative numbers', () => {
		expect(integerLengthMath(-34_312)).toEqual(5);
	});
});
