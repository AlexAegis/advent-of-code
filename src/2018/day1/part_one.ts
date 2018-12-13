import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export const read = new Promise<number>(res => {
	let sum = 0;
	createInterface({
		input: createReadStream('src/2018/day1/input.txt')
	})
		.on('line', line => {
			sum = eval(sum + line);
		})
		.on('close', () => res(sum));
});

(async () => console.log(await read))(); // 408
