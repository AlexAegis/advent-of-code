import { describe, expect, it } from 'vitest';
import { invModEgdc, invModEgdcBigInt } from './inverse-modulo.function.js';

describe('Inverse Modulo', () => {
	it('should return 9 with 3 and 26', async () => {
		expect(invModEgdc(123, 4567)).to.equal(854);
		expect(invModEgdcBigInt(123n, 4567n)).to.equal(854n);
	});

	it('should return 854 with 123 and 4567', async () => {
		expect(invModEgdc(123, 4567)).to.equal(854);
		expect(invModEgdcBigInt(123n, 4567n)).to.equal(854n);
	});

	it('should return 347 with 11 636', async () => {
		expect(invModEgdc(11, 636)).to.equal(347);
		expect(invModEgdcBigInt(11n, 636n)).to.equal(347n);
	});
});
