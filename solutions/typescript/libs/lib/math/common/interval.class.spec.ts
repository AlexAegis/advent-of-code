import { describe, expect, it } from 'vitest';
import { Interval } from './interval.class.js';

describe('Interval', () => {
	describe('sorting by the low end', () => {
		it('should order by value first, then by qualifier', () => {
			// In this scenario, closed comes earlier
			const intervals = [
				new Interval(2, 10, { lowQualifier: 'open' }),
				new Interval(2, 10, { lowQualifier: 'closed' }),
				new Interval(0, 10, { lowQualifier: 'closed' }),
			];
			const sorted = [...intervals].sort(Interval.compareByLow);
			expect(sorted[0]).toBe(intervals[2]);
			expect(sorted[1]).toBe(intervals[1]);
			expect(sorted[2]).toBe(intervals[0]);
		});
	});

	describe('sorting by the high end', () => {
		it('should order by value first, then by qualifier', () => {
			// In this scenario, open comes earlier
			const intervals = [
				new Interval(0, 10, { highQualifier: 'closed' }),
				new Interval(0, 10, { highQualifier: 'open' }),
				new Interval(0, 8, { highQualifier: 'closed' }),
			];
			const sorted = [...intervals].sort(Interval.compareByHigh);
			expect(sorted[0]).toBe(intervals[2]);
			expect(sorted[1]).toBe(intervals[1]);
			expect(sorted[2]).toBe(intervals[0]);
		});
	});

	describe('intersection', () => {
		it('should return undefined if there is no intersection', () => {
			const a = new Interval(1, 2);
			const b = new Interval(40, 50);

			expect(a.intersection(b)).toBeUndefined();
		});

		it('should return the overlapping parts, using the inner ends qualifiers', () => {
			const a = new Interval(1, 8, { lowQualifier: 'open', highQualifier: 'closed' });
			const b = new Interval(4, 16, { lowQualifier: 'closed', highQualifier: 'open' });

			expect(a.intersection(b)).toEqual(
				new Interval(4, 8, { lowQualifier: 'closed', highQualifier: 'closed' })
			);
		});

		it('should return the smaller if the larger completely encompasses it', () => {
			const a = new Interval(1, 8, { lowQualifier: 'open', highQualifier: 'closed' });
			const b = new Interval(4, 6, { lowQualifier: 'closed', highQualifier: 'open' });

			expect(a.intersection(b)).toEqual(b);
		});

		it('should use the stronger qualifier when their ends are at the same point', () => {
			const a = new Interval(1, 2, { lowQualifier: 'open', highQualifier: 'closed' });
			const b = new Interval(1, 2, { lowQualifier: 'closed', highQualifier: 'open' });

			expect(a.intersection(b)).toEqual(
				new Interval(1, 2, { lowQualifier: 'open', highQualifier: 'open' })
			);
		});

		it('should be able to get a finite intersection of infinite intervals', () => {
			const a = new Interval(-Infinity, 2, { lowQualifier: 'open', highQualifier: 'closed' });
			const b = new Interval(1, Infinity, { lowQualifier: 'closed', highQualifier: 'open' });

			expect(a.intersection(b)).toEqual(
				new Interval(1, 2, { lowQualifier: 'closed', highQualifier: 'closed' })
			);
		});
	});
});
