/**
 * Modulo normalizing to a positive remainer
 *
 * @returns the positive remainder
 */
export const posMod = (n: number, m: number): number => {
	const mod = n % m;
	// Math abs eliminates -0
	return Math.abs(mod >= 0 ? mod : (mod + m) % m);
};

/**
 * Modulo normalizing to a positive remainer
 *
 * @returns the positive remainder
 */
export const posModBigInt = (n: bigint, m: bigint): bigint => {
	const mod = n % m;
	return mod >= 0 ? mod : (mod + m) % m;
};
