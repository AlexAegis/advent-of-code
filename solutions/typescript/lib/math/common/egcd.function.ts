import { posMod, posModBigInt } from '../discrete/positive-modulo.function.js';

/**
 * Greatest Common Divisor using the Extended Euclidean Algorithm
 *
 * @returns [gcd, ...quotiens]
 */
export const egcd = (a: number, b: number): [number, number, number] => {
	if (a === 0) {
		return [b, 0, 1];
	} else {
		const [gcd, y, x] = egcd(posMod(b, a), a);
		return [gcd, x - (b / a) * y, y];
	}
};

/**
 * Greatest Common Divisor using the Extended Euclidean Algorithm
 *
 * @returns [gcd, ...quotiens]
 */
export const egcdBigInt = (a: bigint, b: bigint): [bigint, bigint, bigint] => {
	if (a === 0n) {
		return [b, 0n, 1n];
	} else {
		const [g, y, x] = egcdBigInt(posModBigInt(b, a), a);
		return [g, x - (b / a) * y, y];
	}
};
