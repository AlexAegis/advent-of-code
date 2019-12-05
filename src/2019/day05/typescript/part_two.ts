import { bench, read } from '@lib';
import { day, year } from '.';
import { parseCommaSeparatedNumbers } from './parse';

export const compute = (a: number[], noun?: number, verb?: number, immutable = true): number => {
	const arr = immutable ? [...a] : a;
	if (noun !== undefined) {
		arr[1] = noun;
	}
	if (verb !== undefined) {
		arr[2] = verb;
	}
	let i = 0;
	let result = 0;
	while (true) {
		const curr = arr[i % arr.length];
		let paramMode: number[] = [];
		let instruction = curr;
		if (curr >= 100) {
			const s = curr.toString();
			paramMode = curr
				.toString()
				.substring(0, s.length - 2)
				.split('')
				.map(e => Number(e))
				.reverse();
			instruction = Number(curr.toString().substring(s.length - 2));
		}

		let step = 4;
		const ogI = i;
		if (instruction === 99) {
			break;
		}

		const paramA =
			paramMode.length === 0 || paramMode[0] === 0 ? arr[arr[(i + 1) % arr.length]] : arr[(i + 1) % arr.length];
		const paramB =
			paramMode.length <= 1 || paramMode[1] === 0 ? arr[arr[(i + 2) % arr.length]] : arr[(i + 2) % arr.length];
		const paramC =
			paramMode.length <= 2 || paramMode[2] === 0 ? arr[arr[(i + 3) % arr.length]] : arr[(i + 3) % arr.length];

		console.log(instruction, ' res: ', i, paramA, paramB, paramC, arr);

		// const paramC = arr[(i + 3) % arr.length];

		if (instruction === 1) {
			if (paramMode.length <= 2 || paramMode[2] === 0) {
				arr[arr[(i + 3) % arr.length]] = paramA + paramB;
			} else {
				arr[(i + 3) % arr.length] = paramA + paramB;
			}
		}

		if (instruction === 2) {
			if (paramMode.length <= 2 || paramMode[2] === 0) {
				// Parameters that an instruction writes to will never be in immediate mode.
				arr[arr[(i + 3) % arr.length]] = paramA * paramB;
			} else {
				arr[(i + 3) % arr.length] = paramA * paramB;
			}
		}

		if (instruction === 3) {
			arr[paramB] = paramA;
			step = 2;
		}

		if (instruction === 4) {
			result = paramA;
			if (paramMode.length <= 1 || paramMode[0] === 0) {
				arr[arr[(i + 1) % arr.length]] = paramA;
			} else {
				arr[(i + 1) % arr.length] = paramA; // arr[paramA] ?
			}
			step = 2;
		}

		if (instruction === 7) {
			if (paramA < paramB) {
				arr[paramC] = 1;
			} else {
				arr[paramC] = 0;
			}
			step = 5;
		}

		if (instruction === 8) {
			if (paramA === paramB) {
				arr[paramC] = 1;
			} else {
				arr[paramC] = 0;
			}
			step = 5;
		}

		i = (i + step) % arr.length;

		if (instruction === 5) {
			if (paramA !== 0) {
				i = paramB % arr.length;
			} /* else {
				i = ogI;
			}*/
		}

		if (instruction === 6) {
			if (paramA === 0) {
				i = paramB % arr.length;
			} /*else {
				i = ogI;
			}*/
		}
	}

	return result;
};

export const runner = async (input: string) => {
	const a = parseCommaSeparatedNumbers(input);
	const s = compute(a, undefined, undefined, false);
	// const s = compute(a, 5, undefined, false);

	return s;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await runner('3,3,1108,-1,8,3,4,3,99')}`))();
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
