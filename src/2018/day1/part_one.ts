import { createReadStream } from 'fs';
import { Interface, createInterface } from 'readline';

async function read() {
	return new Promise(res => {
		let sum = 0;

		const reader: Interface = createInterface({
			input: createReadStream('src/2018/day1/input.txt')
		});

		reader
			.on('line', line => {
				sum = eval(sum + line);
			})
			.on('close', () => res(sum));
	});
}
(async () => {
	console.log(await read());
})(); // 408
