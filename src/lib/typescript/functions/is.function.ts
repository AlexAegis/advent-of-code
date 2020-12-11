/**
 * Predicate Factory
 *
 * @example [1, 2, 3].filter(is(2)) // [2]
 * @example [1, 2, 3].some(is(2)) // true
 */
export const is = <T, A extends T>(...a: A[]) => (b: T): b is A => a.some((ai) => ai === b);
