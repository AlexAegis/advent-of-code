export const partition = <T>(array: T[], partitioner: (a: T) => boolean): [T[], T[]] => {
	const a = [];
	const b = [];
	for (const e of array) {
		if (partitioner(e)) {
			a.push(e);
		} else {
			b.push(e);
		}
	}
	return [a, b];
};
