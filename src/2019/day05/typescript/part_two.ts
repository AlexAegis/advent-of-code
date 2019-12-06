// import { bench, read } from '@lib';
// import { day, year } from '.';
import { parseCommaSeparatedNumbers } from './parse';

export const compute = (tape: number[], input?: number): number => {
	let i = 0;
	let result = 0;
	while (true) {
		const curr = tape[i];
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

		const paramA = paramMode.length === 0 || paramMode[0] === 0 ? tape[tape[i + 1]] : tape[i + 1];
		const paramB = paramMode.length <= 1 || paramMode[1] === 0 ? tape[tape[i + 2]] : tape[i + 2];
		// const paramC =
		// 	paramMode.length <= 2 || paramMode[2] === 0 ? arr[arr[(i + 3)]] : arr[(i + 3)];

		// 	console.log(instruction, ' res: ', i, paramA, paramB, paramC, arr);

		// const paramC = arr[(i + 3)];

		if (instruction === 1) {
			tape[tape[i + 3]] = paramA + paramB;
			step = 3;
		}

		if (instruction === 2) {
			tape[tape[i + 3]] = paramA * paramB;
			step = 3;
		}

		if (instruction === 3) {
			if (input) {
				tape[tape[i + 1]] = input;
			}
			step = 2;
		}

		if (instruction === 4) {
			result = paramA;
			console.log(result);
			// arr[arr[(i + 1)]] = paramA;

			step = 2;
		}

		if (instruction === 7) {
			if (paramA < paramB) {
				tape[tape[i + 3]] = 1;
				// 	arr[paramC] = 1;
			} else {
				tape[tape[i + 3]] = 0;
				// 	arr[paramC] = 0;
			}
			step = 3;
		}

		if (instruction === 8) {
			if (paramA === paramB) {
				tape[tape[i + 3]] = 1;
				// arr[paramC] = 1;
			} else {
				// 	arr[paramC] = 0;
				tape[tape[i + 3]] = 0;
			}
			step = 3;
		}

		i = i + step;

		if (instruction === 5) {
			if (paramA !== 0) {
				i = paramB;
			} /* else {
				i = ogI;
			}*/
		}

		if (instruction === 6) {
			if (paramA === 0) {
				i = paramB;
			} /*else {
				i = ogI;
			}*/
		}

		if (instruction > 8) {
			console.log('UNSUPPORTED INSTRUCTION!', instruction, i, curr, tape.toString());
			break;
		}
	}

	return result;
};

export const runner = async (input: string) => {
	const a = parseCommaSeparatedNumbers(input);
	// const s = compute(a, undefined);
	const s = compute(a, 1);

	return s;
};

if (require.main === module) {
	/*	(async () =>
		console.log(
			`Result: ${await runner(
				'3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'
			)}`
		))();*/

	(async () => console.log(`Result: ${await runner('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9')}`))();

	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}

// 16348437 too high
