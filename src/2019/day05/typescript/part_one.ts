import { bench, read } from '@lib';
import { day, year } from '.';
import { parseCommaSeparatedNumbers } from './parse';

export const compute = (a: number[], input?: number, immutable = true): number => {
	const arr = immutable ? [...a] : a;

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
		if (instruction === 99) {
			break;
		}

		const paramA =
			paramMode.length === 0 || paramMode[0] === 0 ? arr[arr[(i + 1) % arr.length]] : arr[(i + 1) % arr.length];
		const paramB =
			paramMode.length <= 1 || paramMode[1] === 0 ? arr[arr[(i + 2) % arr.length]] : arr[(i + 2) % arr.length];

		if (instruction === 1) {
			arr[arr[(i + 3) % arr.length]] = paramA + paramB;
		}

		if (instruction === 2) {
			arr[arr[(i + 3) % arr.length]] = paramA * paramB;
		}

		if (instruction === 3) {
			if (input) {
				arr[arr[(i + 2) % arr.length]] = input;
			}

			step = 2;
		}

		if (instruction === 4) {
			result = paramA;
			step = 2;
		}

		i = (i + step) % arr.length;
	}

	return result;
};

export const runner = async (input: string) => {
	const a = parseCommaSeparatedNumbers(input);
	const s = compute(a, 1, false);

	return s;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await runner('1002,4,3,4,33')}`))();
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 16348437 ~0ms
}
