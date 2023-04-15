export const addAllToSet = <T>(items: T[], set: Set<T> = new Set()): Set<T> => {
	for (const item of items) {
		set.add(item);
	}
	return set;
};
