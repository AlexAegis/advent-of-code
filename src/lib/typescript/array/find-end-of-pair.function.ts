/**
 * Assumes that `from` is a begin part of the pair
 *
 * @param t
 * @param param1
 * @param from
 * @returns the index of the ending part of the pair
 */
export const findEndOfPair = <T>(t: T[], [begin, end]: [T, T], from = 0): number | undefined => {
	if (t[from] !== begin) {
		throw new Error('First element must be the opening part of the pair');
	}
	let pc = 1;
	let i = from + 1;
	for (; i < t.length; i++) {
		if (t[i] === begin) pc++;
		else if (t[i] === end) pc--;
		if (pc === 0) break;
	}
	if (pc !== 0) {
		return undefined;
	}
	return i;
};
