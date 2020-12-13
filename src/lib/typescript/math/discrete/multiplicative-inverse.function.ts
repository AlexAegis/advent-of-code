/**
 * Multiplicative Inverse
 * @param a
 * @param b
 */
export const mulInv = (a: number, b: number): number => {
	const b0 = b;
	let x0 = 0;
	let x1 = 1;
	let q: number;
	let tmp: number;
	if (b == 1) {
		return 1;
	}
	while (a > 1) {
		q = a / b;
		tmp = a;
		a = b;
		b = tmp % b;
		tmp = x0;
		x0 = x1 - q * x0;
		x1 = tmp;
	}
	if (x1 < 0) {
		x1 = x1 + b0;
	}
	return x1;
};

/**
 * Multiplicative Inverse (BigInt)
 * @param a
 * @param b
 */
export const mulInvBigInt = (a: bigint, b: bigint): bigint => {
	const b0 = b;
	let x0 = 0n;
	let x1 = 1n;
	let q: bigint;
	let tmp: bigint;
	if (b == 1n) {
		return 1n;
	}
	while (a > 1n) {
		q = a / b;
		tmp = a;
		a = b;
		b = tmp % b;
		tmp = x0;
		x0 = x1 - q * x0;
		x1 = tmp;
	}
	if (x1 < 0n) {
		x1 = x1 + b0;
	}
	return x1;
};
