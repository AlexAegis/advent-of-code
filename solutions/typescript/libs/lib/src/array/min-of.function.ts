import { ascending, min } from '../math/index.js';

export const minOf = (array: number[], count = 1): number | number[] => {
	return count === 1
		? array.reduce(min, Number.POSITIVE_INFINITY)
		: [...array].sort(ascending).splice(0, count);
};
