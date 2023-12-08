import { Vec2, type Vec2Like, type Vec2String } from '../../index.js';

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

	// static invertQualifier(qualifier: 'closed'): 'open';
	// static invertQualifier(qualifier: 'open'): 'closed';
	static invertQualifier(qualifier: IntervalEndpointQualifier): IntervalEndpointQualifier {
		return qualifier === 'open' ? 'closed' : 'open';
	}

	// static invertDesignation(designation: 'high'): 'low';
	// static invertDesignation(designation: 'low'): 'high';
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
		let points: QualifiedNumber[] = [];
		if (within) {
			points = Interval.collectAllPoints(within);
		}
		points.push(...Interval.collectAllPoints(intervals).map(Interval.invertQualifiedNumber));

		return Interval.mergeQualifiedNumbers(points);
	}

	static invertQualifiedNumber(this: void, qualifiedNumber: QualifiedNumber): QualifiedNumber {
		return {
			value: qualifiedNumber.value,
			originalDesignation: Interval.invertDesignation(qualifiedNumber.originalDesignation),
			highQualifier: Interval.invertQualifier(qualifiedNumber.highQualifier),
			lowQualifier: Interval.invertQualifier(qualifiedNumber.lowQualifier),
		};
	}

	static collectAllPoints(this: void, intervals: Interval[]): QualifiedNumber[] {
		const result: QualifiedNumber[] = [];
		for (const interval of intervals) {
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
				const matchingNumber = intervalStartStack.shift()!;
				result.push(
					new Interval(matchingNumber.value, qualifiedNumber.value, {
						lowQualifier: matchingNumber.lowQualifier,
						highQualifier: qualifiedNumber.highQualifier,
					}),
				);
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
	 * This takes openness into account
	 */
	lowest(): number {
		return this.lowQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER ? this.low : this.low + 1;
	}

	/**
	 * This takes openness into account, i
	 */
	highest(): number {
		return this.highQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER
			? this.high
			: this.high - 1;
	}

	static isTooHigh(interval: IntervalLike, n: number): boolean {
		// ? Check for closedness as the high qualifier is open by default
		return interval.highQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER
			? interval.high < n
			: interval.high <= n;
	}

	static isBelowHigh(interval: IntervalLike, n: number): boolean {
		return !Interval.isTooHigh(interval, n);
	}

	static isTooLow(interval: IntervalLike, n: number): boolean {
		// ? Check for openness as the low qualifier is closed by default
		return interval.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER
			? n <= interval.low
			: n < interval.low;
	}

	static isAboveLow(interval: IntervalLike, n: number): boolean {
		return !Interval.isTooLow(interval, n);
	}

	isTooHigh(n: number): boolean {
		return Interval.isTooHigh(this, n);
	}

	isBelowHigh(n: number): boolean {
		return Interval.isBelowHigh(this, n);
	}

	isTooLow(n: number): boolean {
		return Interval.isTooLow(this, n);
	}

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
	 * TODO: Openness
	 */
	isBeforeOf(other: Interval): boolean {
		return this.low <= other.low && this.high <= other.low;
	}

	/**
	 * TODO: Openness
	 */
	isAfterOf(other: Interval): boolean {
		return other.high <= this.low && other.high <= this.high;
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
	 * Comparator, comparing qualified numbers
	 *
	 * For the low end, closed comes earlier
	 */
	static compareQualifiedNumber(this: void, a: QualifiedNumber, b: QualifiedNumber): number {
		// Check for openness because the default for the highQualifier
		// when it's not defined is CLOSED
		return a.value === b.value
			? a.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER
				? 1
				: -1
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

	toString(): string {
		return `${this.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER ? '(' : '['}${this.low},${
			this.high
		}${this.highQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER ? ')' : ']'}`;
	}
}
