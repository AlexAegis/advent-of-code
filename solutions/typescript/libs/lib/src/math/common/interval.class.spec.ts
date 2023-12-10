import { describe, expect, it } from 'vitest';
import {
	INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
	INTERVAL_ENDPOINT_OPEN_QUALIFIER,
	Interval,
	type QualifiedNumber,
} from './interval.class.js';

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

	describe('collectAllPoints', () => {
		it('should destructure a list of intervals into thier individual points, sorted', () => {
			const points = Interval.collectAllSignificantPoints([
				Interval.closed(1, 4),
				Interval.closed(2, 5),
			]);
			expect(points[0]).toEqual<QualifiedNumber>({
				value: 1,
				lowQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
				highQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
				originalDesignation: 'low',
			});
			expect(points[1]).toEqual<QualifiedNumber>({
				value: 2,
				lowQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
				highQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
				originalDesignation: 'low',
			});
			expect(points[2]).toEqual<QualifiedNumber>({
				value: 4,
				lowQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
				highQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
				originalDesignation: 'high',
			});
			expect(points[3]).toEqual<QualifiedNumber>({
				value: 5,
				lowQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
				highQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
				originalDesignation: 'high',
			});

			expect(points.length).toEqual(4);
		});

		it('should destructure an empty interval into no points', () => {
			const points = Interval.collectAllSignificantPoints([Interval.openClosed(1, 1)]);
			expect(points.length).toEqual(0);
		});

		it('should destructure a single interval into two points', () => {
			const points = Interval.collectAllSignificantPoints([Interval.closed(1, 2)]);
			expect(points.length).toEqual(2);

			expect(points[0]).toEqual<QualifiedNumber>({
				value: 1,
				lowQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
				highQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
				originalDesignation: 'low',
			});
			expect(points[1]).toEqual<QualifiedNumber>({
				value: 2,
				lowQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
				highQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
				originalDesignation: 'high',
			});
		});
	});

	describe('sorting qualified numbers', () => {
		it('should, sort numbers first, then original destinations, then qualifiers', () => {
			const first: QualifiedNumber = {
				originalDesignation: 'low',
				value: 0,
				lowQualifier: 'closed',
				highQualifier: 'open',
			};
			const second: QualifiedNumber = {
				value: 0,
				originalDesignation: 'high',
				highQualifier: 'open',
				lowQualifier: 'closed',
			};
			const third: QualifiedNumber = {
				value: 4,
				originalDesignation: 'low',
				highQualifier: 'closed',
				lowQualifier: 'open',
			};
			const fourth: QualifiedNumber = {
				originalDesignation: 'high',
				value: 4,
				lowQualifier: 'open',
				highQualifier: 'closed',
			};

			const points: QualifiedNumber[] = [first, third, second, fourth];
			points.sort(Interval.compareQualifiedNumber);
			expect(points).toEqual([first, second, third, fourth]);
		});
	});

	describe('mergeQualifiedNumbers', () => {
		it('should be able to create an interval out of two numbers', () => {
			const interval = Interval.mergeQualifiedNumbers([
				{
					value: 1,
					originalDesignation: 'low',
					lowQualifier: 'closed',
					highQualifier: 'open',
				},
				{
					value: 2,
					originalDesignation: 'high',
					lowQualifier: 'open',
					highQualifier: 'closed',
				},
			]);
			expect(interval).toEqual([
				new Interval(1, 2, { lowQualifier: 'closed', highQualifier: 'closed' }),
			]);
		});

		it('should extend open ends into infinity', () => {
			const interval = Interval.mergeQualifiedNumbers([
				{
					value: 1,
					originalDesignation: 'low',
					lowQualifier: 'closed',
					highQualifier: 'open',
				},
			]);

			expect(interval).toEqual([
				new Interval(1, Number.POSITIVE_INFINITY, {
					lowQualifier: 'closed',
					highQualifier: 'open',
				}),
			]);
		});

		it('should extend open starts from infinity', () => {
			const interval = Interval.mergeQualifiedNumbers([
				{
					value: 1,
					originalDesignation: 'high',
					lowQualifier: 'open',
					highQualifier: 'closed',
				},
			]);

			expect(interval).toEqual([
				new Interval(1, Number.NEGATIVE_INFINITY, {
					lowQualifier: 'open',
					highQualifier: 'closed',
				}),
			]);
		});

		it('should not merge qualifiers that would become empty', () => {
			const interval = Interval.mergeQualifiedNumbers([
				{
					value: 1,
					originalDesignation: 'low',
					lowQualifier: 'open',
					highQualifier: 'closed',
				},
				{
					value: 1,
					originalDesignation: 'high',
					lowQualifier: 'closed',
					highQualifier: 'open',
				},
			]);

			expect(interval.length).toEqual(0);
		});
	});

	describe('complement', () => {
		it('should return two intervals when taking the complement of one', () => {
			const complement = Interval.complement([Interval.closed(0, 4)]);
			expect(complement.length).toEqual(2);
			expect(complement[0]).toEqual(
				new Interval(Number.NEGATIVE_INFINITY, 0, {
					lowQualifier: 'open',
					highQualifier: 'open',
				}),
			);
			expect(complement[1]).toEqual(
				new Interval(4, Number.POSITIVE_INFINITY, {
					lowQualifier: 'open',
					highQualifier: 'open',
				}),
			);
		});

		it('should return the same two intervals when taking the complement of two that are embedded together', () => {
			const complement = Interval.complement([Interval.closed(0, 4), Interval.closed(1, 3)]);
			expect(complement.length).toEqual(2);
			expect(complement[0]).toEqual(
				new Interval(Number.NEGATIVE_INFINITY, 0, {
					lowQualifier: 'open',
					highQualifier: 'open',
				}),
			);
			expect(complement[1]).toEqual(
				new Interval(4, Number.POSITIVE_INFINITY, {
					lowQualifier: 'open',
					highQualifier: 'open',
				}),
			);
		});

		it('should return the two edges when trying to completement an open interval within its closed counterpart ', () => {
			const complement = Interval.complement([Interval.open(0, 4)], [Interval.closed(0, 4)]);
			expect(complement.length).toEqual(2);
			expect(complement[0]).toEqual<Interval>(Interval.closed(0, 0));
			expect(complement[1]).toEqual<Interval>(Interval.closed(4, 4));
		});

		it('should return nothing when trying to completement an interval within itself', () => {
			const complement = Interval.complement(
				[Interval.closed(0, 4)],
				[Interval.closed(0, 4)],
			);

			expect(complement.length).toEqual(0);
		});

		it('should return nothing when trying to completement intervals, completely filling the within interval', () => {
			const complement = Interval.complement(
				[Interval.closed(0, 2), Interval.openClosed(2, 4)],
				[Interval.closed(0, 4)],
			);
			expect(complement.length).toEqual(0);
		});

		it('should return two intervals for a completely enclosed interval', () => {
			const complement = Interval.complement(
				[Interval.closed(79, 92)],
				[Interval.closed(50, 98)],
			);
			expect(complement.length).toEqual(2);
			expect(complement[0]).toEqual(Interval.closedOpen(50, 79));
			expect(complement[1]).toEqual(Interval.openClosed(92, 98));
		});

		it('should return three intervals for two completely enclosed intervals', () => {
			const complement = Interval.complement(
				[Interval.closed(55, 67), Interval.closed(79, 92)],
				[Interval.closed(50, 98)],
			);
			expect(complement.length).toEqual(3);
			expect(complement[0]).toEqual(Interval.closedOpen(50, 55));
			expect(complement[1]).toEqual(Interval.open(67, 79));
			expect(complement[2]).toEqual(Interval.openClosed(92, 98));
		});
	});
});
