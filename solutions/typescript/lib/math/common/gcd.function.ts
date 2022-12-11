/**
 * Greatest common divisor
 */
const gcdOverTwo = (x = 0, y = 0): number => {
	x = Math.abs(x);
	y = Math.abs(y);
	while (y) {
		const t = y;
		y = x % y;
		x = t;
	}
	return x;
};

export const gcd = (x?: number | number[], y?: number): number =>
	Array.isArray(x) ? x.reduce((a, n) => gcdOverTwo(a, n), 1) : gcdOverTwo(x, y);
