export const pairwise = <T>(array: T[], callback: (a: T, b: T) => void): void => {
	let last: T | undefined = undefined;
	for (const element of array) {
		if (last !== undefined) {
			callback(last, element);
		}
		last = element;
	}
};
