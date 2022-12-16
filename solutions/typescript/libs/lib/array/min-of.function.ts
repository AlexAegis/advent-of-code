import { ascending, min } from '../math/index.js';

export const minOf = (array: number[], count = 1): number | number[] => {
	if (count === 1) {
		return array.reduce(min, Infinity);
	} else {
		return [...array].sort(ascending).splice(0, count);
	}
};
