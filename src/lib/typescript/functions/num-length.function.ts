/**
 * Returns the length of a number.
 *
 * This is actually faster than converting it to a string and getting its length.
 * Proof: https://jsperf.com/number-of-digits-in-number
 *
 * @param n the number of whichs length will be returned
 */
export function numLength(n: number): number {
	return Math.ceil(Math.log10(Math.abs(n) + 1));
}
