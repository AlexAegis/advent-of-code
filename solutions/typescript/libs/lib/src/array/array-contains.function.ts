export const arrayContains = <T>(array: T[], item: T): boolean => {
	return hasEquals(item) ? array.some((i) => item.equals(i)) : array.includes(item);
};

export interface Equals {
	equals(other: unknown): other is this;
}

export const hasEquals = (o: unknown): o is Equals => {
	return typeof (o as Equals).equals === 'function';
};
