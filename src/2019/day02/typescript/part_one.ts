import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string) => {
	const arr = input
		.split(',')
		.filter(c => /^(\+|-)?[0-9]+/.test(c))
		.map(c => Number(c));
	arr[1] = 12;
	arr[2] = 2;
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

if (require.main === module) {
	// (async () => console.log(`Result: ${await runner('1,1,1,4,99,5,6,0,99')}`))(); // 3101844 ~0.25ms
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3101844 ~0.25ms
}
