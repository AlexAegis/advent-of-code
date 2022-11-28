import { describe, expect, it } from 'vitest';
import { modExp, modExpBigInt } from './modular-exponentiation.function.js';

describe('Modular Exponentiation', () => {
	it('should return 11 with 11, 13 and 19', async () => {
		expect(modExp(11, 636, 17)).to.equal(13);
		expect(modExpBigInt(11n, 13n, 19n)).to.equal(11n);
	});

	it('should return 13 with 11, 636 and 17', async () => {
		expect(modExp(11, 13, 19)).to.equal(11);
		expect(modExpBigInt(11n, 636n, 17n)).to.equal(13n);
	});
});
