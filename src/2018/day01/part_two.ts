import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export const runner = async (input: 'example' | 'input' = 'input'): Promise<number> => {
	let frequencyHistory = new Set();
	let cache: Array<number> = [];
	let fileRead: boolean = false;
	let sumTotal: number = 0;
	let sumOnce: number;
	let firstToBeTwice: number = undefined;

	const reader = createInterface({
		input: createReadStream(`src/2018/day01/${input}.txt`)
	});
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

	const prom = new Promise<number>(res => {
		reader
			.on('line', line => calculate(Number(line)))
			.on('close', () => {
				sumOnce = sumTotal;
				fileRead = true;
				res(sumOnce);
			});
	});
	await prom;

	while (firstToBeTwice === undefined) {
		cache.forEach(calculate);
	}

	return firstToBeTwice;
};

if (require.main === module) {
	console.time();
	(async () => {
		console.log(`First to be repeated: ${await runner()}`);
		console.timeEnd();
	})(); // 55250 ~19ms
}
