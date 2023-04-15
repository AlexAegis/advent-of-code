import { ascending } from '../math/index.js';

export const median = (array: number[], skipSort = false): number => {
	const sortedArray = skipSort ? array : [...array].sort(ascending);
	const half = sortedArray.length / 2;
	if (sortedArray.length % 2 === 0) {
		const first = sortedArray[half - 1] ?? 0;
		const second = sortedArray[half] ?? 0;
		return (first + second) / 2;
	} else {
		return sortedArray[Math.floor(half)] ?? 0;
	}
};
