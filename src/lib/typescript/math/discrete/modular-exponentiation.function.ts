/**
 * Modular exponentiation to solve a ^ b mod n
 */
export const modExp = (a: number, b: number, n: number): number =>
	Number(modExpBigInt(BigInt(a), BigInt(b), BigInt(n)));

/**
 * Modular exponentiation to solve a ^ b mod n directly with bigints
 */
export const modExpBigInt = (a: bigint, b: bigint, n: bigint): bigint => {
	a = a % n;
	let result = 1n;
	let x = a;

	while (b > 0) {
		const leastSignificantBit = b % 2n;
		b = b >> 1n;

		if (leastSignificantBit == 1n) {
			result = (result * x) % n;
		}

		x = (x * x) % n;
	}
	return result;
};
