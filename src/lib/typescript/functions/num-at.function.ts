/**
 * Returns the length of a number.
 *
 * This is actually faster than converting it to a string and getting its length.
 * Proof: https://jsperf.com/number-of-digits-in-number
 *
 * @param n the number of whichs length will be returned
 */
export function numAt(n: number, p: number): number {
	return Math.floor((n / Math.pow(10, Math.floor(Math.log10(Math.abs(n))) - p)) % 10);
}
