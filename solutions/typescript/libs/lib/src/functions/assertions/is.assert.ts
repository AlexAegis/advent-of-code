/**
 * Predicate Factory
 *
 * @example [1, 2, 3].filter(is(2)) // [2]
 * @example [1, 2, 3].some(is(2)) // true
 */
export const is =
	<T, R extends T>(...a: R[]) =>
	(b: T): b is R =>
		a.includes(b as R);
