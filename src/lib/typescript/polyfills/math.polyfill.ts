import {
	invMod,
	invModBigInt,
	isBetween,
	modExp,
	modExpBigInt,
	posMod,
	posModBigInt,
} from '@lib/math';

export interface Range<T = number> {
	low: T;
	high: T;
}

declare global {
	interface Number {
		/**
		 * Positive Modulo
		 * @param m modulo
		 */
		posMod(m: number): number;
		isBetween(l: number, h: number): boolean;
		isBetweenRange(range: Range<number>): boolean;
		invMod(n: number): number;
		modExp(b: number, n: number): number;
	}

	interface BigInt {
		/**
		 * Positive Modulo
		 * @param m modulo
		 */
		posMod(m: bigint): bigint;
		isBetween(l: bigint, h: bigint): boolean;
		invMod(n: bigint): bigint;
		modExp(b: bigint, n: bigint): bigint;
	}

	interface String {
		toInt(radix?: number): number | undefined;
	}
}

Number.prototype.posMod = function (this: number, m: number): number {
	return posMod(this, m);
};

BigInt.prototype.posMod = function (this: bigint, m: bigint): bigint {
	return posModBigInt(this, m);
};

Number.prototype.isBetween = function (this: number, l: number, h: number): boolean {
	return isBetween(this, l, h);
};

Number.prototype.isBetweenRange = function (this: number, range: Range<number>): boolean {
	return isBetween(this, range.low, range.high);
};

BigInt.prototype.isBetween = function (this: bigint, l: bigint, h: bigint): boolean {
	return isBetween(this, l, h);
};

Number.prototype.invMod = function (this: number, n: number): number {
	return invMod(this, n);
};

BigInt.prototype.invMod = function (this: bigint, n: bigint): bigint {
	return invModBigInt(this, n);
};

Number.prototype.modExp = function (this: number, b: number, n: number): number {
	return modExp(this, b, n);
};

BigInt.prototype.modExp = function (this: bigint, b: bigint, n: bigint): bigint {
	return modExpBigInt(this, b, n);
};

String.prototype.toInt = function (this: string, radix = 10): number | undefined {
	const n = parseInt(this, radix);
	return isNaN(n) ? undefined : n;
};
