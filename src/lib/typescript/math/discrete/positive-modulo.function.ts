import { BigInteger } from 'big-integer';

export const mod = (n: number, m: number): number => {
	return ((n % m) + m) % m;
};

export const modn = (n: bigint, m: bigint): bigint => {
	return ((n % m) + m) % m;
};

export const bigIntModPos = (n: BigInteger, m: BigInteger): BigInteger => {
	return n.mod(m).add(m).mod(m);
};

declare global {
	interface Number {
		mod(m: number): number;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface BigInt {
		mod(m: BigInt): BigInt;
	}
}

Number.prototype.mod = function (this: number, m: number): number {
	return mod(this, m);
};

BigInt.prototype.mod = function (this: BigInt, m: BigInt): BigInt {
	return modn(this as bigint, m as bigint);
};
