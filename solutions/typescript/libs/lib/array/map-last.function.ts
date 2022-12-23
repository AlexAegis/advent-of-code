export const mapLast = <T, V>(array: T[], map: (t: T) => V | undefined): V | undefined => {
	for (let i = array.length - 1; i >= 0; i--) {
		const value = map(array[i]);
		if (value) {
			return value;
		}
	}
	return undefined;
};
