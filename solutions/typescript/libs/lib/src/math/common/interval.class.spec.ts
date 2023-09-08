import { describe, expect, it } from 'vitest';
import { Interval } from './interval.class.js';

describe('Interval', () => {
	describe('length', () => {
		it('should be 1 for closed intervals starting and ending on the same position', () => {
			const i = Interval.closed(0, 0);
			expect(i.length).toBe(1);
		});

		it('should be 0 for intervals starting and ending on the same position and have at least one open ends', () => {
			const i1 = Interval.closedOpen(0, 0);
			expect(i1.length).toBe(0);
			const i2 = Interval.openClosed(0, 0);
			expect(i2.length).toBe(0);
			const i3 = Interval.open(0, 0);
			expect(i3.length).toBe(0);
		});

		it('should count ends for closed intervals', () => {
			const i1 = Interval.closed(0, 2);
			expect(i1.length).toBe(3);
		});

		it('should count only one of the ends for mixed end intervals', () => {
			const i1 = Interval.openClosed(0, 2);
			expect(i1.length).toBe(2);
			const i2 = Interval.closedOpen(0, 2);
			expect(i2.length).toBe(2);
		});

		it('should count neither endpoints for open intervals', () => {
			const i1 = Interval.open(0, 2);
			expect(i1.length).toBe(1);
		});

		it('should count ends for closed intervals and the low end is negative', () => {
			const i1 = Interval.closed(-1, 1);
			expect(i1.length).toBe(3);
		});

		it('should count only one of the ends for mixed end intervals and the low end is negative', () => {
			const i1 = Interval.openClosed(-1, 1);
			expect(i1.length).toBe(2);
			const i2 = Interval.closedOpen(-1, 1);
			expect(i2.length).toBe(2);
		});

		it('should count neither endpoints for open intervals and the low end is negative', () => {
			const i1 = Interval.open(-1, 1);
			expect(i1.length).toBe(1);
		});
	});

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
				new Interval(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
				new Interval(0, 0),
				new Interval(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
			];
			const sorted = [...intervals].sort(Interval.compareByLow);
			expect(sorted[0]).toBe(intervals[2]);
			expect(sorted[1]).toBe(intervals[1]);
			expect(sorted[2]).toBe(intervals[0]);
		});
	});

	describe('mergeOne', () => {
		it('should return undefined if they are not intersecting', () => {
			const i1 = Interval.closed(0, 1);
			const i2 = Interval.closed(4, 5);
			const merged = i1.mergeOne(i2);
			expect(merged).toBeUndefined();
		});

		it('should merge two partially overlapping intervals into one', () => {
			const i1 = Interval.closed(0, 3);
			const i2 = Interval.closed(2, 5);
			const merged = i1.mergeOne(i2);
			expect(merged).toEqual(Interval.closed(0, 5));
		});

		it('should merge two fully overlapping intervals into the bigger one', () => {
			const i1 = Interval.closed(2, 3);
			const i2 = Interval.closed(0, 5);
			const merged = i1.mergeOne(i2);
			expect(merged).toEqual(i2);
		});

		it('should merge two touching intervals when one end is closed and the other one is open', () => {
			const i1 = Interval.closed(0, 2);
			const i2 = Interval.open(2, 4);
			const merged = i1.mergeOne(i2);
			expect(merged).toEqual(Interval.closedOpen(0, 4));
		});

		it('should merge two touching intervals when one end is open and the other one is closed', () => {
			const i1 = Interval.open(2, 4);
			const i2 = Interval.closed(0, 2);
			const merged = i1.mergeOne(i2);
			expect(merged).toEqual(Interval.closedOpen(0, 4));
		});

		it('should not merge two touching intervals when both ends are open', () => {
			const i1 = Interval.open(2, 4);
			const i2 = Interval.open(0, 2);
			const merged = i1.mergeOne(i2);
			expect(merged).toBeUndefined();
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
			const interval = new Interval(Number.NEGATIVE_INFINITY, 2);
			const moved = interval.clone().moveLowTo(0);
			expect(moved).toEqual(new Interval(0, Number.POSITIVE_INFINITY));
		});

		it('should not change an interval with an infinite low end by moving it to the same Infinity', () => {
			const interval = new Interval(Number.NEGATIVE_INFINITY, 2);
			const moved = interval.clone().moveLowTo(Number.NEGATIVE_INFINITY);
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
			interval.moveBy(Number.POSITIVE_INFINITY);
			expect(interval).toEqual(
				new Interval(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
			);
		});

		it('should move an intervals both to -Infinity when moved by -Infinity', () => {
			const interval = new Interval(4, 6);
			interval.moveBy(Number.NEGATIVE_INFINITY);
			expect(interval).toEqual(
				new Interval(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
			);
		});

		it('should not move the infinite ends when moved by a finite amount', () => {
			const a = new Interval(Number.NEGATIVE_INFINITY, 6);
			a.moveBy(2);
			expect(a).toEqual(new Interval(Number.NEGATIVE_INFINITY, 8));

			const b = new Interval(0, Number.POSITIVE_INFINITY);
			b.moveBy(2);
			expect(b).toEqual(new Interval(2, Number.POSITIVE_INFINITY));
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
			const interval = new Interval(0, Number.POSITIVE_INFINITY);
			const moved = interval.clone().moveHighTo(0);
			expect(moved).toEqual(new Interval(Number.NEGATIVE_INFINITY, 0));
		});

		it('should not change an interval with an infinite high end by moving it to the same Infinity', () => {
			const interval = new Interval(0, Number.POSITIVE_INFINITY);
			const moved = interval.clone().moveHighTo(Number.POSITIVE_INFINITY);
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
				new Interval(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
				new Interval(0, 0),
				new Interval(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
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
				new Interval(4, 8, { lowQualifier: 'closed', highQualifier: 'closed' }),
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
				new Interval(1, 2, { lowQualifier: 'open', highQualifier: 'open' }),
			);
		});

		it('should be able to get a finite intersection of infinite intervals', () => {
			const a = new Interval(Number.NEGATIVE_INFINITY, 2, {
				lowQualifier: 'open',
				highQualifier: 'closed',
			});
			const b = new Interval(1, Number.POSITIVE_INFINITY, {
				lowQualifier: 'closed',
				highQualifier: 'open',
			});

			expect(a.intersection(b)).toEqual(
				new Interval(1, 2, { lowQualifier: 'closed', highQualifier: 'closed' }),
			);
		});
	});
});
