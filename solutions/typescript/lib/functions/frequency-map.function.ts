export const frequencyMap = (input: string[]): Map<string, number> => {
	const frequencies = new Map<string, number>();
	for (const fragment of input) {
		frequencies.set(fragment, (frequencies.get(fragment) ?? 0) + 1);
	}
	return frequencies;
};
