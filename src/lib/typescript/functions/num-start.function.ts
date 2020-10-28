/**
 *
 * @param n of which we'll cut it's start
 * @param length of the part you want to cut.
 * If it's larger than the length of, it will pad the end with zeroes
 */
export function numStart(n: number, length = 1): number {
	const l = Math.pow(10, Math.floor(Math.log10(n)) - length + 1);
	const b = Math.floor(n / l);
	const p = Math.pow(10, length);
	return b - Math.floor(b / p) * p;
}
