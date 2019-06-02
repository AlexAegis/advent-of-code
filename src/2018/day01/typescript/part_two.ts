import { bench } from '@root/bench.function';
import { reader } from '@root/reader.function';

export const runner = (input: string): number => {
	let frequencyHistory = new Set();
	let cache: Array<number> = [];
	let fileRead: boolean = false;
	let sumTotal: number = 0;
	let firstToBeTwice: number = undefined;

	const calculate = (line: number) => {
		if (!fileRead) {
			cache.push(line);
		}
		sumTotal += line;
		if (!firstToBeTwice) {
			let prevLength = frequencyHistory.size;
			frequencyHistory.add(sumTotal);
			if (frequencyHistory.size === prevLength) {
				firstToBeTwice = sumTotal;
			}
		}
	};

	input
		.split('\n')
		.map(s => Number(s))
		.forEach(calculate);

	while (firstToBeTwice === undefined) {
		cache.forEach(calculate);
	}

	return firstToBeTwice;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(2018, 1, 'input.txt'), runner)}`))(); // 55250 ~13.5ms
}
