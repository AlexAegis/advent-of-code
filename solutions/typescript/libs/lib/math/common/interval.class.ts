import { Vec2, Vec2Like, Vec2String } from '../../index.js';

export interface IntervalLike extends Partial<IntervalQualifier> {
	low: number;
	high: number;
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

	constructor(low: number, high: number, options: IntervalQualifier = INTERVAL_CLOSED_OPEN) {
		this.low = Math.min(low, high);
		this.high = Math.max(low, high);
		this.lowQualifier = options?.lowQualifier ?? INTERVAL_ENDPOINT_CLOSED_QUALIFIER;
		this.highQualifier = options?.highQualifier ?? INTERVAL_ENDPOINT_OPEN_QUALIFIER;
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

	moveBy(by: number): Interval {
		this.low += by;
		this.high += by;
		return this;
	}

	moveLowTo(low: number): Interval {
		const diff = this.low - low;
		this.low = low;
		this.high = this.high - diff;
		return this;
	}

	moveHighTo(high: number): Interval {
		const diff = this.high - high;
		this.low = high - diff;
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

	private mergeOne(other: Interval): [Interval] | [Interval, Interval] {
		const smallerFrom = Math.min(this.low, other.low);
		const largerTo = Math.max(this.high, other.high);

		const result: [Interval] = [this.clone()];
		if (this.contains(other.low) || this.contains(other.high)) {
			result[0].low = smallerFrom;
			result[0].high = largerTo;
		} else if (other.isAfterOf(this)) {
			// No intersection, cannot merge, instead push...
			result.push(other);
		} else {
			// But keep the order
			result.unshift(other);
		}

		return result;
	}

	static merge(spans: Interval[]): Interval[] {
		const [first, ...remaining] = spans.sort((a, b) => a.low - b.low);

		const result: Interval[] = [first];
		for (const span of remaining) {
			const mergeBase = result.pop()!;
			result.push(...mergeBase.mergeOne(span));
		}

		return result;
	}

	/**
	 * This takes openness into account
	 */
	first(): number {
		return this.lowQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER ? this.low : this.low + 1;
	}

	/**
	 * This takes openness into account, i
	 */
	last(): number {
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
		for (let i = this.first(); this.contains(i); i++) {
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

	intersection(other: IntervalLike): Interval | undefined {
		return Interval.intersection(this, other);
	}

	static intersection(a: IntervalLike, b: IntervalLike): Interval | undefined {
		if (!Interval.intersects(a, b)) {
			return undefined;
		}

		const [_lowestLow, highestLow] = [a, b].sort(Interval.compareByLow);
		const [lowestHigh, _highestHigh] = [a, b].sort(Interval.compareByLow);

		return new Interval(highestLow.low, lowestHigh.high, {
			lowQualifier: highestLow.lowQualifier,
			highQualifier: lowestHigh.highQualifier,
		});
	}

	/**
	 * Comparator, comparing only the low end of an interval. When they are
	 * equal, use the qualifier.
	 *
	 * For the low end, closed comes earlier
	 */
	static compareByLow(a: IntervalLike, b: IntervalLike): number {
		// Check for openness because the default for the highQualifier
		// when it's not defined is CLOSED
		return a.low === b.low
			? a.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER
				? 1
				: -1
			: a.low - b.low;
	}

	/**
	 * Comparator, comparing only the high end of an interval. When they are
	 * equal, use the qualifier.
	 *
	 * For the high end, open comes earlier
	 */
	static compareByHigh(a: IntervalLike, b: IntervalLike): number {
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

	static intersects(a: IntervalLike, b: IntervalLike): boolean {
		return Interval.contains(a, b.low) || Interval.contains(a, b.high);
	}

	static contains(interval: IntervalLike, n: number): boolean {
		return Interval.isAboveLow(interval, n) && Interval.isBelowHigh(interval, n);
	}

	toString(): string {
		return `${this.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER ? '(' : '['}${this.low},${
			this.high
		}${this.highQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER ? ')' : ']'}`;
	}
}
