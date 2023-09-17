import { describe, expect, it } from 'vitest';
import { invModEgdc, invModEgdcBigInt } from './inverse-modulo.function.js';

describe('Inverse Modulo', () => {
	it('should return 9 with 3 and 26', () => {
		expect(invModEgdc(123, 4567)).toEqual(854);
		expect(invModEgdcBigInt(123n, 4567n)).toEqual(854n);
	});

	it('should return 854 with 123 and 4567', () => {
		expect(invModEgdc(123, 4567)).toEqual(854);
		expect(invModEgdcBigInt(123n, 4567n)).toEqual(854n);
	});

	it('should return 347 with 11 636', () => {
		expect(invModEgdc(11, 636)).toEqual(347);
		expect(invModEgdcBigInt(11n, 636n)).toEqual(347n);
	});
});
