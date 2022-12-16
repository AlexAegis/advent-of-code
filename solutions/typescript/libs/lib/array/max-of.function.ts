import { descending, max } from '../math/index.js';

export const maxOf = (array: number[], count = 1): number | number[] => {
	if (count === 1) {
		return array.reduce(max, -Infinity);
	} else {
		return [...array].sort(descending).splice(0, count);
	}
};
