export const rotateArray = <T>(array: T[], until: (t: T[], c?: T) => boolean): T[] => {
	while (until(array, array[0])) {
		array.push(array.shift() as any);
	}
	return array;
};

export const rotateArrayBack = <T>(array: T[], until: (t: T[], c?: T) => boolean): T[] => {
	while (until(array, array[array.length - 1])) {
		array.unshift(array.pop() as any);
	}
	return array;
};
