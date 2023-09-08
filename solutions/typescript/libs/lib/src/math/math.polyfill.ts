import {
	Interval,
	addWithinRange,
	invMod,
	invModBigInt,
	lerp1D,
	modExp,
	modExpBigInt,
	posMod,
	posModBigInt,
	type IntervalLike,
	type IntervalQualifier,
	type Lerp1DOptions,
} from '../math/index.js';

declare global {
	interface Number {
		/**
		 * Positive Modulo
		 * @param m modulo
		 */
		posMod(m: number): number;
		isContainedIn(interval: IntervalLike): boolean;
		invMod(n: number): number;
		modExp(b: number, n: number): number;
		lerp(to: number, options?: Lerp1DOptions): number[];
		iterate(from?: number): number[];
		interval(to: number, qualifier?: IntervalQualifier): Interval;
		isInt(): boolean;
		addWithinRange(add: number, fromOrTo?: number, to?: number): number;
	}

	interface BigInt {
		/**
		 * Positive Modulo
		 * @param m modulo
		 */
		posMod(m: bigint): bigint;
		invMod(n: bigint): bigint;
		modExp(b: bigint, n: bigint): bigint;
	}

	interface String {
		toInt(radix?: number): number | undefined;
		tryInt(radix?: number): number;
	}
}

Number.prototype.isInt = function (this: number): boolean {
	return Math.floor(this) === this;
};

Number.prototype.interval = function (
	this: number,
	to: number,
	options?: IntervalQualifier,
): Interval {
	return new Interval(this, to, options);
};

Number.prototype.addWithinRange = function (
	this: number,
	add: number,
	fromOrTo?: number,
	optionalTo?: number,
): number {
	return addWithinRange(this, add, fromOrTo, optionalTo);
};

Number.prototype.iterate = function (this: number, from = 0): number[] {
	return lerp1D(from, this, { excludeStart: false, excludeEnd: true });
};

Number.prototype.lerp = function (this: number, to: number, options?: Lerp1DOptions): number[] {
	return lerp1D(this, to, options);
};

Number.prototype.posMod = function (this: number, m: number): number {
	return posMod(this, m);
};

BigInt.prototype.posMod = function (this: bigint, m: bigint): bigint {
	return posModBigInt(this, m);
};

Number.prototype.isContainedIn = function (this: number, span: IntervalLike): boolean {
	return Interval.contains(span, this);
};

Number.prototype.invMod = function (this: number, n: number): number {
	return invMod(this, n);
};

BigInt.prototype.invMod = function (this: bigint, n: bigint): bigint {
	return invModBigInt(this, n);
};

const numberProtoModExp = function (this: number, b: number, n: number): number {
	return modExp(this, b, n);
};
Object.assign(Number.prototype, { modExp: numberProtoModExp });

const bigIntProtoModExp = function (this: bigint, b: bigint, n: bigint): bigint {
	return modExpBigInt(this, b, n);
};
Object.assign(BigInt.prototype, { modExp: bigIntProtoModExp });

const toInt = function (this: string, radix = 10): number | undefined {
	const result = Number.parseInt(this, radix);
	return Number.isNaN(result) ? undefined : result;
};
Object.assign(String.prototype, { toInt });

String.prototype.tryInt = function (this: string, radix = 10): number {
	const result = Number.parseInt(this, radix);
	if (Number.isNaN(result)) {
		throw new TypeError(`Number::tryInt Converting '${this}' resulted in NaN!`);
	}
	return result;
};
