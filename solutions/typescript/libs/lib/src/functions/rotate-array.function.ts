export const rotateArrayTimes = <T>(array: T[], n: number): T[] => {
	let i = 0;
	const na = Math.abs(n);
	while (i < na) {
		if (n > 0) {
			array.push(array.shift() as T);
		} else {
			array.unshift(array.pop() as T);
		}
		i++;
	}
	return array;
};

export const rotateArray = <T>(array: T[], until: (t: T[], c?: T) => boolean): T[] => {
	while (until(array, array[0])) {
		array.push(array.shift() as T);
	}
	return array;
};

export const rotateArrayBack = <T>(array: T[], until: (t: T[], c?: T) => boolean): T[] => {
	while (until(array, array.at(-1))) {
		array.unshift(array.pop() as T);
	}
	return array;
};
