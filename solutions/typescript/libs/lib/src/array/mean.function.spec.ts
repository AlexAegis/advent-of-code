import { describe, expect, it } from 'vitest';
import { mean } from './mean.function.js';

describe('mean', () => {
	it('should return 1.5 as the average of 0, 1, 2', () => {
		expect(mean([0, 1, 2])).toEqual(1);
	});

	it('should return 1.5 as the average of 1, 2', () => {
		expect(mean([1, 2])).toEqual(1.5);
	});

	it('should return 0 for an empty array', () => {
		expect(mean([])).toEqual(0);
	});
});
