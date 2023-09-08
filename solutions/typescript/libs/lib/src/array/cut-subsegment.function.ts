import { findEndOfPair } from './find-end-of-pair.function.js';

/**
 * Splices out a part of an array between a defined pair. Can optionally leave
 * a spit behind for easier access. If not you can splice that place back.
 *
 * The first (or at the index, `from`) value must equal to the first pair!
 *
 * @param t to splice from. Will be modified!
 * @param pair, for example ['(', ')']
 * @param from the index to start the splicing from. `t` must contain a
 *             starting pair here
 * @param leaveOneBehind optionally the starting element can be left intact
 *                       by default the entire pair is thrown out
 */
export const cutSubSegment = <T>(
	t: T[],
	pair: [T, T],
	from = 0,
	leaveOneBehind = false,
): T[] | undefined => {
	const j = findEndOfPair(t, pair, from);
	if (j === undefined) {
		return undefined;
	} else {
		const inner = t.splice(from + 1, j - from - 1); // Strip the inner part
		if (leaveOneBehind) {
			t.splice(from + 1, 1); // throw only the end of the pair out
		} else {
			t.splice(from, 2); // Throw the pair out
		}
		return inner;
	}
};
