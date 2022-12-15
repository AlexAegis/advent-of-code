import { Vec2, Vec2Like, Vec2String } from '../../index.js';

export interface SpanLike extends SpanOpenness {
	from: number;
	to: number;
}

export interface SpanOpenness {
	/**
	 * @default true
	 */
	fromOpen?: boolean;
	/**
	 * @default true
	 */
	toOpen?: boolean;
}

/**
 * It's called Span and not Range because that's already used in lib.dom
 */
export class Span implements SpanLike {
	from: number;
	to: number;
	fromOpen = true;
	toOpen = true;

	constructor(from: number, to: number) {
		this.from = Math.min(from, to);
		this.to = Math.max(from, to);
	}

	static parse(span: Vec2String | Vec2Like): Span {
		const asVec = new Vec2(span);
		return new Span(asVec.x, asVec.y);
	}

	get length(): number {
		return this.to - this.from;
	}

	shiftMut(by: number): Span {
		this.from += by;
		this.to += by;
		return this;
	}

	merge(...others: Span[]): Span[] {
		return Span.merge([this, ...others]);
	}

	private mergeOne(other: Span): [Span] | [Span, Span] {
		const smallerFrom = Math.min(this.from, other.from);
		const largerTo = Math.max(this.to, other.to);

		const result: [Span] = [this.clone()];
		if (this.contains(other.from) || this.contains(other.to)) {
			result[0].from = smallerFrom;
			result[0].to = largerTo;
		} else if (other.isAfterOf(this)) {
			// No intersection, cannot merge, instead push...
			result.push(other);
		} else {
			// But keep the order
			result.unshift(other);
		}

		return result;
	}

	static merge(spans: Span[]): Span[] {
		const [first, ...remaining] = spans.sort((a, b) => a.from - b.from);

		const result: Span[] = [first];
		for (const span of remaining) {
			const mergeBase = result.pop()!;
			result.push(...mergeBase.mergeOne(span));
		}

		return result;
	}

	isBeforeOf(other: Span): boolean {
		return this.from <= other.from && this.to <= other.from;
	}

	isAfterOf(other: Span): boolean {
		return other.to <= this.from && other.to <= this.to;
	}

	clone(): Span {
		return new Span(this.from, this.to);
	}

	contains(n: number, options?: SpanOpenness): boolean {
		return Span.contains(this, n, options);
	}

	static contains(span: SpanLike, n: number, options?: SpanOpenness): boolean {
		let largerThanFrom: boolean;
		if (options?.fromOpen ?? span.fromOpen ?? true) {
			largerThanFrom = span.from <= n;
		} else {
			largerThanFrom = span.from < n;
		}

		let smallerThanTo: boolean;
		if (options?.toOpen ?? span.toOpen ?? true) {
			smallerThanTo = n <= span.to;
		} else {
			smallerThanTo = n < span.to;
		}
		return largerThanFrom && smallerThanTo;
	}
}
