import { egcdBigInt } from '../common/egcd.function.js';
import { posModBigInt } from './positive-modulo.function.js';

/**
 * Inverse Modulo
 *
 * This one is faster than the egdc variant
 *
 * Uses bigints internally
 *
 * @param a
 * @param m
 */
export const invMod = (a: number, m: number): number => {
	return Number(invModBigInt(BigInt(a), BigInt(m)));
};

/**
 * Inverse Modulo directly with bigints
 *
 * This one is faster than the egdc variant
 *
 * @param a
 * @param m
 */
export const invModBigInt = (a: bigint, m: bigint): bigint => {
	const b0 = m;
	let x0 = 0n;
	let x1 = 1n;
	let q: bigint;
	let tmp: bigint;
	if (m == 1n) {
		return 1n;
	}
	while (a > 1n) {
		if (m === 0n) {
			throw new Error('Multiplicative inverse does not exist, tried to divide by 0');
		}
		q = a / m;
		tmp = a;
		a = m;
		m = tmp % m;
		tmp = x0;
		x0 = x1 - q * x0;
		x1 = tmp;
	}
	if (x1 < 0n) {
		x1 = x1 + b0;
	}
	return x1;
};

/**
 * Inverse Modulo using egdc
 *
 * @param a number
 * @param m modulo
 * @deprecated this one is slower than the non egdc variant
 */
export const invModEgdc = (a: number, m: number): number => {
	return Number(invModEgdcBigInt(BigInt(a), BigInt(m)));
};

/**
 * Inverse Module directly for bigints using egdc
 *
 * @param a number
 * @param m modulo
 * @deprecated this one is slower than the non egdc variant
 */
export const invModEgdcBigInt = (a: bigint, m: bigint): bigint => {
	const [g, x] = egcdBigInt(a, m);
	if (g === 1n) {
		return posModBigInt(x, m);
	} else {
		throw new Error(`Modular inverse of ${a} modulo ${m} does not exist`);
	}
};
