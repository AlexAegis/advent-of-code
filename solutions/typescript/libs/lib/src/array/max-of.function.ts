import { descending, max } from '../math/common/basic-operations.functions.js';

export const maxOf = (array: number[], count = 1): number | number[] => {
	return count === 1
		? array.reduce(max, Number.NEGATIVE_INFINITY)
		: [...array].sort(descending).splice(0, count);
};
