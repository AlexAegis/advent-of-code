export const peek = <T>(array: T[]): T => {
	return array.at(-1) as T;
};
