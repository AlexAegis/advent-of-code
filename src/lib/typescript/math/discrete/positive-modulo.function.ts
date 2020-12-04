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
