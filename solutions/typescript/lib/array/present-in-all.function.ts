/**
 * Intersection of arrays
 *
 * @returns the elements present in all of the inputs
 */
export const presentInAll = <T>(arrays: T[][]): T[] => {
	if (arrays.length) {
		const rest = arrays.slice(1);
		return arrays[0].filter((item) =>
			rest.every((restItems) => restItems.some((restItem) => restItem === item))
		);
	} else {
		return [];
	}
};
