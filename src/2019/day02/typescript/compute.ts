export const compute = (a: number[], noun?: number, verb?: number, immutable = true): number => {
	const arr = immutable ? [...a] : a;
	if (noun !== undefined) {
		arr[1] = noun;
	}
	if (verb !== undefined) {
		arr[2] = verb;
	}
	let i = 0;
	while (true) {
		const curr = arr[i % arr.length];

		if (curr === 99) {
			break;
		}

		if (curr === 1) {
			arr[arr[(i + 3) % arr.length]] = arr[arr[(i + 1) % arr.length]] + arr[arr[(i + 2) % arr.length]];
		}

		if (curr === 2) {
			arr[arr[(i + 3) % arr.length]] = arr[arr[(i + 1) % arr.length]] * arr[arr[(i + 2) % arr.length]];
		}

		i = (i + 4) % arr.length;
	}

	return arr[0];
};
