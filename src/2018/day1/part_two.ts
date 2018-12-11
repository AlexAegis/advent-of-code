import { createReadStream } from 'fs';
import { createInterface } from 'readline';

/**
 * If you check my previous implementation I read the file again on each iteration
 * It was quite slow so I reimplemented it to use a cache instead and for any
 * iteration after the first, it would use the cache instead. But it's somehow still slow.
 */
const read = new Promise(async res => {
	let frequencyHistory: Array<number> = [0]; // sums calculated
	let cache: Array<string> = []; // lines cached
	let fileRead: boolean = false;
	let sumTotal: number = 0; // sum until the first iteration found
	let sumOnce: number; // sum of one iteration
	let firstToBeTwice: number = undefined;
	let iterations = 0;

	const reader = createInterface({
		input: createReadStream('src/2018/day1/input.txt')
	});

	const calculate = (line: string) => {
		if (!fileRead) {
			cache.push(line);
		}
		sumTotal = eval(sumTotal + line);
		if (!firstToBeTwice) {
			// only if haven't found yet
			if (frequencyHistory.find(val => val === sumTotal)) {
				console.log(`freq found twice: ${sumTotal}`);

				firstToBeTwice = sumTotal;
			}
			frequencyHistory.push(sumTotal);
		}
	};

	const prom = new Promise<number>(res => {
		reader.on('line', calculate).on('close', () => {
			console.log(`File read. Sum found: ${sumTotal}`);
			sumOnce = sumTotal;
			fileRead = true;
			iterations++;
			res(sumOnce);
		});
	});
	await prom;
	while (!firstToBeTwice) {
		cache.forEach(calculate);
		iterations++;
		console.log(`Iterated over the cache ${iterations}, total number of sums stored: ${frequencyHistory.length}`);
	}
	res(firstToBeTwice);
});

(async () => console.log(`First to be repeated: ${await read}`))(); // 55250
