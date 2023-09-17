import { describe, expect, it } from 'vitest';
import { lcm } from './lcm.function.js';

describe('Least common multiple', () => {
	it('should return 120 with 120 and -20', () => {
		expect(lcm(120, -20)).toEqual(120);
	});

	it('should return 3 with 3, 3', () => {
		expect(lcm(3, 3)).toEqual(3);
	});
});
