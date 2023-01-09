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

		it('should work with infinites', () => {
			const intervals = [
				new Interval(Infinity, Infinity),
				new Interval(0, 0),
				new Interval(-Infinity, -Infinity),
			];
			const sorted = [...intervals].sort(Interval.compareByLow);
			expect(sorted[0]).toBe(intervals[2]);
			expect(sorted[1]).toBe(intervals[1]);
			expect(sorted[2]).toBe(intervals[0]);
		});
	});

	describe('moveLowTo', () => {
		it('should move the intervals low end while maintaining length', () => {
			const interval = new Interval(0, 2);
			const moved = interval.clone().moveLowTo(-2);
			expect(moved.high).toBe(0);
			expect(interval.length).toBe(moved.length);
		});

		it('should move an interval with an infinite low end by moving its other end by infinite too', () => {
			const interval = new Interval(-Infinity, 2);
			const moved = interval.clone().moveLowTo(0);
			expect(moved).toEqual(new Interval(0, Infinity));
		});

		it('should not change an interval with an infinite low end by moving it to the same Infinity', () => {
			const interval = new Interval(-Infinity, 2);
			const moved = interval.clone().moveLowTo(-Infinity);
			expect(moved).toEqual(interval);
		});
	});

	describe('moveBy', () => {
		it('should move an intervals both ends when moved by a finite amount', () => {
			const interval = new Interval(4, 6);
			interval.moveBy(5);
			expect(interval).toEqual(new Interval(9, 11));
		});

		it('should move an intervals both to Infinity when moved by Infinity', () => {
			const interval = new Interval(4, 6);
			interval.moveBy(Infinity);
			expect(interval).toEqual(new Interval(Infinity, Infinity));
		});

		it('should move an intervals both to -Infinity when moved by -Infinity', () => {
			const interval = new Interval(4, 6);
			interval.moveBy(-Infinity);
			expect(interval).toEqual(new Interval(-Infinity, -Infinity));
		});

		it('should not move the infinite ends when moved by a finite amount', () => {
			const a = new Interval(-Infinity, 6);
			a.moveBy(2);
			expect(a).toEqual(new Interval(-Infinity, 8));

			const b = new Interval(0, Infinity);
			b.moveBy(2);
			expect(b).toEqual(new Interval(2, Infinity));
		});

		it.skip('should move an infinite end when moved by an opposite infinity', () => {
			const a = new Interval(-Infinity, 6);
			a.moveBy(Infinity);
			expect(a).toEqual(new Interval(Infinity, Infinity));

			const b = new Interval(0, Infinity);
			b.moveBy(-Infinity);
			expect(b).toEqual(new Interval(-Infinity, -Infinity));
		});
	});

	describe('moveHighTo', () => {
		it('should move the intervals high end while maintaining length', () => {
			const interval = new Interval(3, 5);
			const moved = interval.clone().moveHighTo(9);
			expect(moved.low).toBe(7);
			expect(interval.length).toBe(moved.length);
		});

		it('should move an interval with an infinite low end by moving its other end by infinite too', () => {
			const interval = new Interval(0, Infinity);
			const moved = interval.clone().moveHighTo(0);
			expect(moved).toEqual(new Interval(-Infinity, 0));
		});

		it('should not change an interval with an infinite high end by moving it to the same Infinity', () => {
			const interval = new Interval(0, Infinity);
			const moved = interval.clone().moveHighTo(Infinity);
			expect(moved).toEqual(interval);
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

		it('should work with infinites', () => {
			const intervals = [
				new Interval(Infinity, Infinity),
				new Interval(0, 0),
				new Interval(-Infinity, -Infinity),
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
