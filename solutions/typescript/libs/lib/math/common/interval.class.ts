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
	lowQualifier: IntervalEndpointQualifier;
	/**
	 * @default 'closed'
	 */
	highQualifier: IntervalEndpointQualifier;
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
		this.lowQualifier = options?.lowQualifier;
		this.highQualifier = options?.highQualifier;
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

	get length(): number {
		return this.high - this.low;
	}

	moveBy(by: number): Interval {
		this.low += by;
		this.high += by;
		return this;
	}

	moveLowTo(low: number): Interval {
		const size = this.length;
		this.low = low;
		this.high = low + size;
		return this;
	}

	moveHighTo(high: number): Interval {
		const size = this.length;
		this.low = high - size;
		this.high = high;
		return this;
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

	static isTooHigh(
		interval: IntervalLike,
		n: number,
		highQualifier: IntervalEndpointQualifier = INTERVAL_ENDPOINT_CLOSED_QUALIFIER
	): boolean {
		return highQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER
			? interval.high <= n
			: interval.high < n;
	}

	static isBelowHigh(
		interval: IntervalLike,
		n: number,
		highQualifier: IntervalEndpointQualifier = INTERVAL_ENDPOINT_CLOSED_QUALIFIER
	): boolean {
		return !Interval.isTooHigh(interval, n, highQualifier);
	}

	static isTooLow(
		interval: IntervalLike,
		n: number,
		lowQualifier: IntervalEndpointQualifier = INTERVAL_ENDPOINT_CLOSED_QUALIFIER
	): boolean {
		return lowQualifier === INTERVAL_ENDPOINT_CLOSED_QUALIFIER
			? n < interval.low
			: n <= interval.low;
	}

	static isAboveLow(
		interval: IntervalLike,
		n: number,
		lowQualifier: IntervalEndpointQualifier = INTERVAL_ENDPOINT_CLOSED_QUALIFIER
	): boolean {
		return !Interval.isTooLow(interval, n, lowQualifier);
	}

	isTooHigh(n: number): boolean {
		return Interval.isTooHigh(this, n, this.highQualifier);
	}

	isBelowHigh(n: number): boolean {
		return Interval.isBelowHigh(this, n, this.highQualifier);
	}

	isTooLow(n: number): boolean {
		return Interval.isTooLow(this, n, this.lowQualifier);
	}

	isAboveLow(n: number): boolean {
		return Interval.isAboveLow(this, n, this.lowQualifier);
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

	contains(n: number, options?: IntervalQualifier): boolean {
		return Interval.contains(this, n, options);
	}

	intersects(other: IntervalLike, options?: IntervalQualifier): boolean {
		return Interval.intersects(this, other, options);
	}

	static intersects(a: IntervalLike, b: IntervalLike, options?: IntervalQualifier): boolean {
		return Interval.contains(a, b.low, options) || Interval.contains(a, b.high, options);
	}

	static contains(interval: IntervalLike, n: number, options?: IntervalQualifier): boolean {
		return (
			Interval.isAboveLow(interval, n, options?.lowQualifier) &&
			Interval.isBelowHigh(interval, n, options?.highQualifier)
		);
	}

	toString(): string {
		return `${this.lowQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER ? '(' : '['}${this.low},${
			this.high
		}${this.highQualifier === INTERVAL_ENDPOINT_OPEN_QUALIFIER ? ')' : ']'}`;
	}
}
