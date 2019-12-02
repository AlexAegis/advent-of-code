import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = async (input: string) => {
	const arrOg = input
		.split(',')
		.filter(c => /^(\+|-)?[0-9]+/.test(c))
		.map(c => Number(c));

	let out = 0;
	let noun = 0;
	let verb = 0;
	while (true) {
		const arr = [...arrOg];
		arr[1] = noun;
		arr[2] = verb;
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
		out = arr[0];
		if (out === 19690720) {
			break;
		}
		noun += 1;
		if (noun >= 99) {
			noun = 0;
			verb++;
		}
	}

	return 100 * noun + verb;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 8478 ~16ms
}
