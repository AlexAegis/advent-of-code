import type { SizedTuple } from '../../model/index.js';

export const slideWindow = <T, N extends number>(
	array: T[],
	windowSize: N = 2 as N,
): SizedTuple<T, N>[] => {
	const result: SizedTuple<T, N>[] = [];
	const window = [];
	for (const element of array) {
		window.push(element);
		if (window.length === windowSize) {
			result.push([...window] as SizedTuple<T, N>);
			window.shift();
		}
	}
	return result;
};
