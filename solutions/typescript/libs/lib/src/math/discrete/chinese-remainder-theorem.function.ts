import { invModBigInt } from './inverse-modulo.function.js';

export interface CongruentModulo<T extends number | bigint> {
	remainder: T;
	modulo: T;
}

/**
 * Chinese Remainder Theorem Solver
 *
 * Uses bigints internally
 *
 * @param a
 * @param n
 */
export const crt = (mods: CongruentModulo<number>[]): number => {
	return Number(
		crtBigInt(
			mods.map(({ remainder, modulo }) => ({
				remainder: BigInt(remainder),
				modulo: BigInt(modulo),
			})),
		),
	);
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
		sm = sm + remainder * invModBigInt(p, modulo) * p;
	}
	return sm % prod;
};
