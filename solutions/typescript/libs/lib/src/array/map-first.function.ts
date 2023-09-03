export const mapFirst = <T, V>(array: T[], map: (t: T) => V | undefined): V | undefined => {
	for (const item of array) {
		const value = map(item);
		if (value) {
			return value;
		}
	}

	return undefined;
};
