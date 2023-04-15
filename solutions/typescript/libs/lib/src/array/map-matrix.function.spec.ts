import { describe, expect, it } from 'vitest';
import { mapMatrix } from './map-matrix.function.js';

describe('mapMatrix', () => {
	it('should change an entire matrix while retaining the size of it', () => {
		const original = [
			['a', 'b'],
			['a', 'b'],
			['a', 'b'],
		];

		const result = mapMatrix(original, (_c) => 1);

		expect(result.length).toBe(3);

		for (const row of result) {
			expect(row.length).toBe(2);

			for (const item of row) {
				expect(item).toBe(1);
			}
		}
	});
});
