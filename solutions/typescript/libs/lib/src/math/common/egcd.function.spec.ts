import { describe, expect, it } from 'vitest';
import { egcd } from './egcd.function.js';

describe('egcd', () => {
	it('should return 20 with 120 and -20', () => {
		expect(egcd(120, -20)[0]).toEqual(20);
	});

	it('should return 3 with 3, 3', () => {
		expect(egcd(3, 3)[0]).toEqual(3);
	});

	it('should return 12 with 24, 36', () => {
		expect(egcd(24, 36)[0]).toEqual(12);
	});
});
