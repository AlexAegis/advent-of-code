import { nonNullish } from '../../functions/non-nullish.function.js';

/**
 * `to` is the last number included in the range!
 */
export const addWithinRange = (
	base: number,
	add: number,
	fromOrTo?: number,
	optionalTo?: number,
): number => {
	if (nonNullish(fromOrTo)) {
		const [from, to] = nonNullish(optionalTo) ? [fromOrTo, optionalTo] : [0, fromOrTo];
		const range = to - from + 1;
		return ((base + add - from) % range) + from;
	} else {
		return base + add;
	}
};
