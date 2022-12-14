import { nonNullish } from '../functions/non-nullish.function.js';

export const filterMap = <T, V>(array: Iterable<T>, mapFn: (t: T) => V | undefined): V[] => {
	const result: V[] = [];
	for (const item of array) {
		const value = mapFn(item);
		if (nonNullish(value)) {
			result.push(value);
		}
	}
	return result;
};
