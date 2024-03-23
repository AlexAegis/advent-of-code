import { nonNullish } from '../functions/non-nullish.function.js';

export const filterMap = <T, R>(
	array: Iterable<T>,
	mapFn: (t: T, i: number) => R | undefined,
): R[] => {
	const result: R[] = [];
	let i = 0;
	for (const item of array) {
		const value = mapFn(item, i);
		if (nonNullish(value)) {
			result.push(value);
		}
		i++;
	}
	return result;
};
