export const iteratorGetUntil = <T>(
	iterator: Iterator<T>,
	condition: (t: T) => boolean,
): T | undefined => {
	for (let next = iterator.next(); !next.done; next = iterator.next()) {
		if (condition(next.value)) {
			return next.value;
		}
	}
	return undefined;
};
