import { promises } from 'fs';

export const runner = (async () => {
	let result = eval(<string>await promises.readFile('src/2018/day1/input.txt', { encoding: 'UTF-8' }));
	console.log(`Result: ${result}`);
	return result;
})(); // 408
