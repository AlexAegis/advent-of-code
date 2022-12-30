export const arrayContains = <T>(array: T[], item: T): boolean => {
	if (hasEquals(item)) {
		return array.find((i) => item.equals(i)) !== undefined;
	} else {
		return array.find((i) => item === i) !== undefined;
	}
};

export interface Equals {
	equals(other: unknown): other is this;
}

export const hasEquals = (o: unknown): o is Equals => {
	return typeof (o as Equals).equals === 'function';
};
