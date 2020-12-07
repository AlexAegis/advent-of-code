import { isBetween, mod, modn } from '@lib/math';

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
