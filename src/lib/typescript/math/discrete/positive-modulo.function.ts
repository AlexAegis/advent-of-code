export const mod = (n: number, m: number): number => {
	return ((n % m) + m) % m;
};

export const modn = (n: bigint, m: bigint): bigint => {
	return ((n % m) + m) % m;
};

declare global {
	interface Number {
		mod(m: number): number;
	}

	interface BigInt {
		mod(m: BigInt): BigInt;
	}
}

Number.prototype.mod = function(this: number, m: number): number {
	return mod(this, m);
};

BigInt.prototype.mod = function(this: BigInt, m: BigInt): BigInt {
	return modn(this as bigint, m as bigint);
};
