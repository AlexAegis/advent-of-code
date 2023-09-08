/**
 * Intersection of arrays
 *
 * @returns the elements present in all of the inputs
 */
export const presentInAll = <T>(arrays: T[][]): T[] => {
	const rest = arrays.slice(1);
	return arrays[0]?.filter((item) => rest.every((restItems) => restItems.includes(item))) ?? [];
};
