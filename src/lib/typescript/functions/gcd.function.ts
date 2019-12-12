/**
 * Greatest common divisor
 */
export const gcd = (x: number = 0, y: number = 0): number => {
	x = Math.abs(x);
	y = Math.abs(y);
	while (y) {
		const t = y;
		y = x % y;
		x = t;
	}
	return x;
};
