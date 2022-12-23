export const mapFirst = <T, V>(array: T[], map: (t: T) => V | undefined): V | undefined => {
	for (let i = 0; i < array.length; i++) {
		const value = map(array[i]);
		if (value) {
			return value;
		}
	}
	return undefined;
};
