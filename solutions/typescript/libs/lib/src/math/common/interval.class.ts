import { Vec2 } from '../../model/vector/vec2.class.js';
import type { Vec2Like, Vec2String } from '../../model/vector/vec2.class.types.js';

export interface IntervalLike extends Partial<IntervalQualifier> {
	low: number;
	high: number;
}

export type IntervalEndpointDesignation = 'high' | 'low';

/**
 * The high and low will always complement eachother, if one is open the other
 * is closed and vice versa
 */
export interface QualifiedNumber {
	value: number;
	originalDesignation: IntervalEndpointDesignation;
	lowQualifier: IntervalEndpointQualifier;
	highQualifier: IntervalEndpointQualifier;
}

export const INTERVAL_ENDPOINT_OPEN_QUALIFIER = 'open';
export const INTERVAL_ENDPOINT_CLOSED_QUALIFIER = 'closed';

export const INTERVAL_CLOSED: IntervalQualifier = {
	lowQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
	highQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
};

export const INTERVAL_CLOSED_OPEN: IntervalQualifier = {
	lowQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
	highQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
};

export const INTERVAL_OPEN: IntervalQualifier = {
	lowQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
	highQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
};

export const INTERVAL_OPEN_CLOSED: IntervalQualifier = {
	lowQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
	highQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
};

export type IntervalEndpointQualifier =
	| typeof INTERVAL_ENDPOINT_OPEN_QUALIFIER
	| typeof INTERVAL_ENDPOINT_CLOSED_QUALIFIER;

export interface IntervalQualifier {
	/**
	 * @default 'open'
	 */
	lowQualifier?: IntervalEndpointQualifier;
	/**
	 * @default 'closed'
	 */
	highQualifier?: IntervalEndpointQualifier;
}

/**
 * As seen in https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * On why it's [closed,open) by default:
 * https://fhur.me/posts/always-use-closed-open-intervals
 */
export class Interval implements IntervalLike, IntervalQualifier {
	low: number;
	high: number;
	/**
	 * @default 'open'
	 */
	lowQualifier: IntervalEndpointQualifier;
	/**
	 * @default 'closed'
	 */
	highQualifier: IntervalEndpointQualifier;

	/**
	 * Contains only one element, 0
	 */
	static readonly ZERO = new Interval(0, 0, INTERVAL_CLOSED);

	/**
	 * Contains no elements
	 */
	static readonly EMPTY = new Interval(0, 0, INTERVAL_OPEN);
	static readonly INFINITE = new Interval(
		Number.NEGATIVE_INFINITY,
		Number.POSITIVE_INFINITY,
		INTERVAL_OPEN,
	);

	constructor(low: number, high: number, options: IntervalQualifier = INTERVAL_CLOSED_OPEN) {
		this.low = Math.min(low, high);
		this.high = Math.max(low, high);
		this.lowQualifier = options.lowQualifier ?? INTERVAL_ENDPOINT_CLOSED_QUALIFIER;
		this.highQualifier = options.highQualifier ?? INTERVAL_ENDPOINT_OPEN_QUALIFIER;
	}

	static invertQualifier(qualifier: IntervalEndpointQualifier): IntervalEndpointQualifier {
		return qualifier === 'open' ? 'closed' : 'open';
	}

	static invertDesignation(
		designation: IntervalEndpointDesignation,
	): IntervalEndpointDesignation {
		return designation === 'low' ? 'high' : 'low';
	}

	static closed(low: number, high: number): Interval {
		return new Interval(low, high, INTERVAL_CLOSED);
	}

	static open(low: number, high: number): Interval {
		return new Interval(low, high, INTERVAL_OPEN);
	}

	static closedOpen(low: number, high: number): Interval {
		return new Interval(low, high, INTERVAL_CLOSED_OPEN);
	}

	static openClosed(low: number, high: number): Interval {
		return new Interval(low, high, INTERVAL_OPEN_CLOSED);
	}

	static parse(span: Vec2String | Vec2Like): Interval {
		const asVec = new Vec2(span);
		return new Interval(asVec.x, asVec.y);
	}

	/**
	 * Shrinks or extends the interval on both ends
	 * @param n
	 */
	pad(n: number): void {
		const newLow = this.low - n;
		const newHigh = this.high + n;
		this.low = Math.min(newLow, newHigh);
		this.high = Math.max(newLow, newHigh);
	}

	clampInto(n: number): number {
		if (this.isTooLow(n)) {
			return this.lowest();
		} else if (this.isTooHigh(n)) {
			return this.highest();
		} else {
			return n;
		}
	}

	isClosedInterval(): boolean {
		return (
			this.lowQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER &&
			this.highQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER
		);
	}

	isOpenInterval(): boolean {
		return (
			this.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER &&
			this.highQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER
		);
	}

	isClosedOpenInterval(): boolean {
		return (
			this.lowQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER &&
			this.highQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER
		);
	}

	isOpenClosedInterval(): boolean {
		return (
			this.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER &&
			this.highQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER
		);
	}

	get length(): number {
		const bothClosedOffset = this.isClosedInterval() ? 1 : 0;
		const bothOpenOffset = this.isOpenInterval() ? -1 : 0;

		return Math.max(bothClosedOffset + bothOpenOffset + this.high - this.low, 0);
	}

	moveBy(by: number): this {
		if (Number.isFinite(this.low)) {
			this.low += by;
		}

		if (Number.isFinite(this.high)) {
			this.high += by;
		}

		return this;
	}

	moveLowTo(low: number): this {
		if (Number.isFinite(this.low)) {
			const diff = this.low - low;
			this.high = this.high - diff;
		} else if (this.low === Number.NEGATIVE_INFINITY && low !== Number.NEGATIVE_INFINITY) {
			this.high = Number.POSITIVE_INFINITY;
		}
		this.low = low;

		return this;
	}

	moveHighTo(high: number): this {
		if (Number.isFinite(this.high)) {
			const diff = this.high - high;
			this.low = this.low - diff;
		} else if (this.high === Number.POSITIVE_INFINITY && high !== Number.POSITIVE_INFINITY) {
			this.low = Number.NEGATIVE_INFINITY;
		}
		this.high = high;

		return this;
	}

	map<U>(mapper: (n: number) => U): U[] {
		return this.reduce((acc, next) => {
			acc.push(mapper(next));
			return acc;
		}, [] as U[]);
	}

	reduce<A>(reducer: (accumulator: A, next: number) => A, initialValue: A): A {
		let accumulator = initialValue;
		for (const item of this.walk()) {
			accumulator = reducer(accumulator, item);
		}
		return accumulator;
	}

	merge(...others: Interval[]): Interval[] {
		return Interval.merge([this, ...others]);
	}

	mergeOne(other: Interval): Interval | undefined {
		const [lowestLow] = [this, other].sort(Interval.compareByLow) as [Interval, Interval];
		const [, highestHigh] = [this, other].sort(Interval.compareByHigh) as [Interval, Interval];

		return this.intersects(other)
			? new Interval(lowestLow.low, highestHigh.high, {
					lowQualifier: lowestLow.lowQualifier,
					highQualifier: highestHigh.highQualifier,
				})
			: undefined;
	}

	static complement(
		this: void,
		intervals: Interval[],
		within?: Interval[] | undefined,
	): Interval[] {
		const points: QualifiedNumber[] = Interval.collectAllSignificantPoints(intervals).map(
			Interval.invertQualifiedNumber,
		);

		if (within) {
			points.push(...Interval.collectAllSignificantPoints(within));
		}

		return Interval.mergeQualifiedNumbers(points, true).filter((m) => !m.isEmpty());
	}

	/**
	 * An interval is empty if both its high and low values are the same, and
	 * it's not a closed interval
	 */
	static isEmpty(this: void, interval: IntervalLike): boolean {
		return (
			interval.low === interval.high &&
			(interval.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER ||
				interval.highQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER)
		);
	}

	isEmpty(): boolean {
		return Interval.isEmpty(this);
	}

	/**
	 * Returns this interval trimmed into another, using the lowest high value
	 * and the highest low value.
	 *
	 * If the interval is completely enveloped, it is simply returned.
	 *
	 * If there is no intersection, undefined is returned.
	 */
	static trim(this: void, interval: Interval, within: Interval): Interval | undefined {
		if (interval.isAfterOf(within) || interval.isBeforeOf(within)) {
			return undefined;
		} else if (within.envelops(interval)) {
			return interval;
		} else {
			let low = interval.low;
			let lowQualifier = interval.lowQualifier;
			if (interval.low < within.low) {
				low = within.low;
				lowQualifier = within.lowQualifier;
			}

			let high = interval.high;
			let highQualifier = interval.highQualifier;
			if (interval.high > within.high) {
				high = within.high;
				highQualifier = within.highQualifier;
			}

			return new Interval(low, high, { lowQualifier, highQualifier });
		}
	}

	/**
	 * Returns this interval trimmed into another, using the lowest high value
	 * and the highest low value.
	 *
	 * If the interval is completely enveloped, it is simply returned.
	 *
	 * If there is no intersection, undefined is returned.
	 */
	trim(within: Interval): Interval | undefined {
		return Interval.trim(this, within);
	}

	static invertQualifiedNumber(this: void, qualifiedNumber: QualifiedNumber): QualifiedNumber {
		return {
			value: qualifiedNumber.value,
			originalDesignation: Interval.invertDesignation(qualifiedNumber.originalDesignation),
			highQualifier: qualifiedNumber.highQualifier,
			lowQualifier: qualifiedNumber.lowQualifier,
		};
	}

	static collectAllSignificantPoints(this: void, intervals: Interval[]): QualifiedNumber[] {
		const result: QualifiedNumber[] = [];
		for (const interval of intervals) {
			if (!interval.isEmpty()) {
				result.push(
					{
						originalDesignation: 'low',
						value: interval.low,
						lowQualifier: interval.lowQualifier,
						highQualifier: Interval.invertQualifier(interval.lowQualifier),
					},
					{
						originalDesignation: 'high',
						value: interval.high,
						lowQualifier: Interval.invertQualifier(interval.highQualifier),
						highQualifier: interval.highQualifier,
					},
				);
			}
		}
		return result.sort(Interval.compareQualifiedNumber);
	}

	static mergeQualifiedNumbers(
		this: void,
		qualifiedNumbers: QualifiedNumber[],
		useSort = true,
	): Interval[] {
		const result: Interval[] = [];
		if (useSort) {
			qualifiedNumbers.sort(Interval.compareQualifiedNumber);
		}

		const intervalStartStack: QualifiedNumber[] = [];
		if (qualifiedNumbers[0]?.originalDesignation === 'high') {
			intervalStartStack.push({
				value: Number.NEGATIVE_INFINITY,
				lowQualifier: 'open',
				highQualifier: 'closed',
				originalDesignation: 'low',
			});
		}
		for (const qualifiedNumber of qualifiedNumbers) {
			if (qualifiedNumber.originalDesignation === 'low') {
				intervalStartStack.push(qualifiedNumber);
			} else if (
				qualifiedNumber.originalDesignation === 'high' &&
				intervalStartStack.length > 0
			) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const matchingLow = intervalStartStack.shift()!;
				const next = new Interval(matchingLow.value, qualifiedNumber.value, {
					lowQualifier: matchingLow.lowQualifier,
					highQualifier: qualifiedNumber.highQualifier,
				});
				if (!next.isEmpty()) {
					result.push(next);
				}
			}
		}
		const last = qualifiedNumbers.at(-1);
		if (last?.originalDesignation === 'low') {
			result.push(
				new Interval(last.value, Number.POSITIVE_INFINITY, {
					lowQualifier: last.lowQualifier,
					highQualifier: 'open',
				}),
			);
		}

		return Interval.merge(result);
	}

	static merge(intervals: Interval[]): Interval[] {
		const [first, ...remaining] = intervals.sort(Interval.compareByLow);

		if (first) {
			const result: Interval[] = [first];
			for (const span of remaining) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const mergeBase = result.pop()!;
				const mergeResult = mergeBase.mergeOne(span);
				if (mergeResult) {
					result.push(mergeResult);
				} else {
					result.push(mergeBase, span);
				}
			}
			return result;
		} else {
			return [];
		}
	}

	/**
	 * Lowest possible integer number. This takes openness into account. low or low + 1 when open
	 */
	lowest(): number {
		return this.lowQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER ? this.low : this.low + 1;
	}

	/**
	 * Highest possible integer number, this takes openness into account, high, or high - 1 when open
	 */
	highest(): number {
		return this.highQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER
			? this.high
			: this.high - 1;
	}

	/**
	 * Checks if a single value is above the high value
	 */
	static isTooHigh(interval: IntervalLike, n: number): boolean {
		return interval.highQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER
			? interval.high < n
			: interval.high <= n;
	}

	/**
	 * Checks if a single value is not above the high value
	 */
	static isBelowHigh(interval: IntervalLike, n: number): boolean {
		return !Interval.isTooHigh(interval, n);
	}

	/**
	 * Checks if a single value is below the low value of the interval
	 */
	static isTooLow(interval: IntervalLike, n: number): boolean {
		return interval.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER
			? n <= interval.low
			: n < interval.low;
	}

	/**
	 * Checks if a single value is not below the low value of the interval
	 */
	static isAboveLow(interval: IntervalLike, n: number): boolean {
		return !Interval.isTooLow(interval, n);
	}

	/**
	 * Checks if a single value is above the high value
	 */
	isTooHigh(n: number): boolean {
		return Interval.isTooHigh(this, n);
	}

	/**
	 * Checks if a single value is not above the high value
	 */
	isBelowHigh(n: number): boolean {
		return Interval.isBelowHigh(this, n);
	}

	/**
	 * Checks if a single value is below the low value of the interval
	 */
	isTooLow(n: number): boolean {
		return Interval.isTooLow(this, n);
	}

	/**
	 * Checks if a single value is not below the low value of the interval
	 */
	isAboveLow(n: number): boolean {
		return Interval.isAboveLow(this, n);
	}

	*walk(): Generator<number> {
		for (let i = this.lowest(); this.contains(i); i++) {
			yield i;
		}
	}

	collectValues(): number[] {
		return [...this.walk()];
	}

	/**
	 * Checks if the first parameter is completely enveloped by the second
	 */
	static envelops(this: void, a: IntervalLike, b: IntervalLike): boolean {
		return (
			Interval.isAboveLow(b, a.low) &&
			Interval.isAboveLow(b, a.high) &&
			Interval.isBelowHigh(b, a.low) &&
			Interval.isBelowHigh(b, a.high)
		);
	}

	/**
	 * Checks if this interal is completely enveloped by the one passed in
	 */
	envelops(other: IntervalLike): boolean {
		return Interval.envelops(this, other);
	}

	/**
	 * Returns if the first parameter is completely above of the second parameter
	 */
	static isAfterOf(this: void, a: IntervalLike, b: IntervalLike): boolean {
		return Interval.isTooHigh(b, a.low) && Interval.isTooHigh(b, a.high);
	}

	/**
	 * Returns if the first parameter is completely above of the second parameter
	 */
	static isBeforeOf(this: void, a: IntervalLike, b: IntervalLike): boolean {
		return Interval.isTooLow(b, a.low) && Interval.isTooLow(b, a.high);
	}

	/**
	 * Checks if an interval is completely below another
	 */
	isBeforeOf(other: Interval): boolean {
		return Interval.isBeforeOf(this, other);
	}

	/**
	 * Checks if an interval is completely above another
	 */
	isAfterOf(other: Interval): boolean {
		return Interval.isAfterOf(this, other);
	}

	clone(): Interval {
		return new Interval(this.low, this.high, {
			lowQualifier: this.lowQualifier,
			highQualifier: this.highQualifier,
		});
	}

	contains(n: number): boolean {
		return Interval.contains(this, n);
	}

	isFinite(): boolean {
		return Number.isFinite(this.low) && Number.isFinite(this.high);
	}

	intersection(other: Interval): Interval | undefined {
		return Interval.intersection(this, other);
	}

	static intersection(this: void, a: Interval, b: Interval): Interval | undefined {
		if (!Interval.intersects(a, b)) {
			return undefined;
		} else if (b.isFinite() && Interval.contains(a, b.low) && Interval.contains(a, b.high)) {
			return b;
		} else if (a.isFinite() && Interval.contains(b, a.low) && Interval.contains(b, a.high)) {
			return a;
		} else {
			const [, highestLow] = [a, b].sort(Interval.compareByLow) as [Interval, Interval];
			const [lowestHigh] = [a, b].sort(Interval.compareByLow) as [Interval, Interval];

			return new Interval(highestLow.low, lowestHigh.high, {
				lowQualifier: highestLow.lowQualifier,
				highQualifier: lowestHigh.highQualifier,
			});
		}
	}

	static intersect(this: void, intersections: Interval[]): Interval | undefined {
		let result = intersections[0];
		if (result === undefined) {
			return undefined;
		}
		for (let i = 1; i <= intersections.length; i++) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			result = result?.intersection(intersections[i]!);
		}

		return result;
	}

	/**
	 * Comparator, comparing only the low end of an interval. When they are
	 * equal, use the qualifier.
	 *
	 * For the low end, closed comes earlier
	 */
	static compareByLow(this: void, a: IntervalLike, b: IntervalLike): number {
		// Check for openness because the default for the highQualifier
		// when it's not defined is CLOSED
		return a.low === b.low
			? a.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER
				? 1
				: -1
			: a.low - b.low;
	}

	/**
	 * a low designation comes before the high designation
	 */
	static compareEndpointDesignation(
		this: void,
		a: IntervalEndpointDesignation,
		b: IntervalEndpointDesignation,
	): number {
		return a === b ? 0 : a === 'low' ? -1 : 1;
	}

	/**
	 * Comparator, comparing qualified numbers
	 *
	 * For the low end, closed comes earlier
	 */
	static compareQualifiedNumber(this: void, a: QualifiedNumber, b: QualifiedNumber): number {
		return a.value === b.value
			? Interval.compareEndpointDesignation(a.originalDesignation, b.originalDesignation)
			: a.value - b.value;
	}

	/**
	 * Comparator, comparing only the high end of an interval. When they are
	 * equal, use the qualifier.
	 *
	 * For the high end, open comes earlier
	 */
	static compareByHigh(this: void, a: IntervalLike, b: IntervalLike): number {
		//
		// Check for closedness because the default for the highQualifier
		// when it's not defined is OPEN
		return a.high === b.high
			? a.highQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER
				? 1
				: -1
			: a.high - b.high;
	}

	intersects(other: IntervalLike): boolean {
		return Interval.intersects(this, other);
	}

	static intersects(this: void, a: IntervalLike, b: IntervalLike): boolean {
		return (
			Interval.contains(a, b.low) ||
			Interval.contains(a, b.high) ||
			Interval.contains(b, a.low) ||
			Interval.contains(b, a.high)
		);
	}

	static contains(this: void, interval: IntervalLike, n: number): boolean {
		return Interval.isAboveLow(interval, n) && Interval.isBelowHigh(interval, n);
	}

	static equals(this: void, a: IntervalLike | undefined, b: IntervalLike | undefined): boolean {
		return (
			(a &&
				b &&
				a.low === b.low &&
				a.high === b.high &&
				(a.lowQualifier ?? 'open') === (b.lowQualifier ?? 'open') &&
				(a.highQualifier ?? 'closed') === (b.highQualifier ?? 'closed')) ??
			false
		);
	}

	equals(other: IntervalLike | undefined): boolean {
		return Interval.equals(this, other);
	}

	/**
	 *
	 * @returns a copy of this interval with both endpoint qualifiers being closed
	 */
	asClosed(): Interval {
		return new Interval(this.low, this.high, {
			lowQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
			highQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
		});
	}

	/**
	 *
	 * @returns a copy of this interval with the low endpoint qualifier being closed and the high open
	 */
	asClosedOpen(): Interval {
		return new Interval(this.low, this.high, {
			lowQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
			highQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
		});
	}

	/**
	 *
	 * @returns a copy of this interval with both endpoint qualifiers being open
	 */
	asOpen(): Interval {
		return new Interval(this.low, this.high, {
			lowQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
			highQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
		});
	}

	/**
	 *
	 * @returns a copy of this interval with the low endpoint qualifier being open and the high closed
	 */
	asOpenClosed(): Interval {
		return new Interval(this.low, this.high, {
			lowQualifier: INTERVAL_ENDPOINT_OPEN_QUALIFIER,
			highQualifier: INTERVAL_ENDPOINT_CLOSED_QUALIFIER,
		});
	}

	closestEndTo(to: number): number {
		const ld = Math.abs(to - this.low);
		const hd = Math.abs(this.high - to);
		return ld < hd ? this.low : this.high;
	}

	toString(): string {
		return `${this.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER ? '(' : '['}${this.low},${
			this.high
		}${this.highQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER ? ')' : ']'}`;
	}
}
