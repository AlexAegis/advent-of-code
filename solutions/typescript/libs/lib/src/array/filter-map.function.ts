import { nonNullish } from '../functions/non-nullish.function.js';

export const filterMap = <T, V>(
	array: Iterable<T>,
	mapFn: (t: T, i: number) => V | undefined,
): V[] => {
	const result: V[] = [];
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
