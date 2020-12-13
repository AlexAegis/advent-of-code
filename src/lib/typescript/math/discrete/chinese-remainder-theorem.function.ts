import { mulInv, mulInvBigInt } from './multiplicative-inverse.function';

export interface CongruentModulo<T extends number | bigint> {
	remainder: T;
	modulo: T;
}

/**
 * Chinese Remainder Theorem Solver
 * @param a
 * @param n
 */
export const crt = (mods: CongruentModulo<number>[]): number => {
	let p = 1;
	let sm = 0;
	const prod = mods.reduce((acc, { modulo }) => acc * modulo, 1);
	for (const { remainder, modulo } of mods) {
		p = prod / modulo;
		sm = sm + remainder * mulInv(p, modulo) * p;
	}
	return sm % prod;
};

/**
 * Chinese Remainder Theorem Solver
 * @param a
 * @param n
 */
export const crtBigInt = (mods: CongruentModulo<bigint>[]): bigint => {
	let p = 1n;
	let sm = 0n;
	const prod = mods.reduce((acc, { modulo }) => acc * modulo, 1n);
	for (const { remainder, modulo } of mods) {
		p = prod / modulo;
		sm = sm + remainder * mulInvBigInt(p, modulo) * p;
	}
	return sm % prod;
};
