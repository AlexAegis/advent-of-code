import { mod, modn } from './discrete';

export * from './common';
export * from './discrete';
export * from './huffman';
export * from './lz';

export const max = (a: number, b: number): number => (a < b ? b : a);
export const min = (a: number, b: number): number => (a > b ? b : a);
export const sum = (a: number, b: number): number => a + b;
export const mult = (a: number, b: number): number => a * b;
export const dup = (a: number): number => a * 2;
export const add = (a: number, b: number): number => a + b;
export const sub = (a: number, b: number): number => a - b;
export const desc = add;
export const asc = sub;
export const isBetween = (n: number, l: number, h: number): boolean => n >= l && n <= h;

declare global {
	interface Number {
		mod(m: number): number;
		isBetween(l: number, h: number): boolean;
	}

	interface BigInt {
		mod(m: BigInt): BigInt;
	}

	interface String {
		toInt(radix?: number): number | undefined;
	}
}

Number.prototype.mod = function (this: number, m: number): number {
	return mod(this, m);
};

BigInt.prototype.mod = function (this: BigInt, m: BigInt): BigInt {
	return modn(this as bigint, m as bigint);
};

Number.prototype.isBetween = function (this: number, l: number, h: number): boolean {
	return isBetween(this, l, h);
};

String.prototype.toInt = function (this: string, radix = 10): number | undefined {
	const n = parseInt(this, radix);
	return isNaN(n) ? undefined : n;
};
