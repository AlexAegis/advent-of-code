/**
 * Greatest common divisor
 */
export const gcd = (x: number, y: number): number => {
	x = Math.abs(x);
	y = Math.abs(y);
	while (y) {
		const t = y;
		y = x % y;
		x = t;
	}
	return x;
};
