import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { Tree } from '@alexaegis/avl';
import { SimpleTree } from '@alexaegis/avl';

export const runner = async (input: 'example' | 'input' = 'input'): Promise<number> => {
	//let frequencyHistory = new Tree<number>();
	//let frequencyHistory = new SimpleTree();
	let frequencyHistory = new Set();
	//let frequencyHistory: Array<number> = [];
	let cache: Array<number> = [];
	let fileRead: boolean = false;
	let sumTotal: number = 0;
	let sumOnce: number;
	let firstToBeTwice: number = undefined;

	const reader = createInterface({
		input: createReadStream(`src/2018/day01/${input}.txt`)
	});
	// frequencyHistory.push(0);
	const calculate = (line: number) => {
		if (!fileRead) {
			cache.push(line);
		}
		sumTotal += line;
		if (!firstToBeTwice) {
			//console.time();

			//if (frequencyHistory.has(sumTotal)) {
			/*if (frequencyHistory.find(val => val === sumTotal)) {
				firstToBeTwice = sumTotal;
			}*/
			let prevLength = frequencyHistory.size;
			frequencyHistory.add(sumTotal);
			if (frequencyHistory.size === prevLength) {
				firstToBeTwice = sumTotal;
			}
			//console.timeEnd();
		}
	};

	/*
	tree
	whole: 
whole: 0.157958984375ms
whole: 0.285ms


access: 0.195ms
access: 0.009033203125ms

push: 0.067138671875ms
push: 0.186ms

simpletree:
whole: 0.31103515625ms
whole: 0.466ms

array:
whole: 0.027099609375ms
whole: 0.141ms

access: 0.011962890625ms
access: 0.264ms
push: 0.004150390625ms
push: 0.203ms
	*/

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

	let iter = 0;
	while (firstToBeTwice === undefined) {
		//for (let i = 0; i < 129465; i++) {
		for (let o of cache) {
			calculate(o);
			iter++;
		}
		//cache.forEach(calculate);
	}
	console.log(`took i: ${iter} iterations to find`); // 129465

	return firstToBeTwice;
};

if (require.main === module) {
	console.time();
	(async () => {
		console.log(`First to be repeated: ${await runner()}`);
		console.timeEnd();
	})(); // 55250 ~22ms
}
