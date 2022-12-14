import { describe, expect, it } from 'vitest';
import { partition } from './partition.function.js';

describe('partition', () => {
	it('should partition by evenness', () => {
		const data = [0, 1, 2, 3, 4, 5, 6];
		const evens = [0, 2, 4, 6];
		const odds = [1, 3, 5];
		const [resultingEvens, resultingOdds] = partition(data, (a) => a % 2 === 0);
		expect(resultingEvens).to.have.all.members(evens);
		expect(resultingOdds).to.have.all.members(odds);
	});
});
