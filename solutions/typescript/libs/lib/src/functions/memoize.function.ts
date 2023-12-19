/**
 * Can cache results for pure functions
 *
 * @param f to memoize
 * @deprecated use common
 */
export const memoizeDeprecated = <F extends (...args: never[]) => ReturnType<F>>(
	f: F,
	cache = new Map<string, ReturnType<F>>(),
): F =>
	((...args: never[]) => {
		const hash = JSON.stringify(args);
		const cached = cache.get(hash);
		if (cached) {
			return cached;
		} else {
			const result = f(...args);
			cache.set(hash, result);
			return result;
		}
	}) as F;
