import { createReadStream } from 'fs';
import { createInterface } from 'readline';

/**
 * I haven't taken into consideration that I'd need to iterate over the
 * this many times (135) so I didn't really cared about reading the same file from
 * disk over and over again. Which is very slow.
 * I should've used the cached content after first iteration.
 */
async function read() {
	return new Promise(async res => {
		let sum = 0;
		let iterations = 0;
		let firstToBeTwice: number = undefined;
		let frequencyHistory = [0];

		let reading = function() {
			return new Promise(res => {
				const readStream = createReadStream('day1/input.txt');
				const reader = createInterface({
					input: readStream,
					crlfDelay: Infinity
				});

				reader.on('line', line => {
					sum = eval(sum + line);
					if (!firstToBeTwice) {
						// only if haven't found yet
						if (frequencyHistory.find(val => val === sum)) {
							console.log(`freq found twice: ${sum}`);

							firstToBeTwice = sum;
						}
						frequencyHistory.push(sum);
					}
				});
				reader.on('close', () => {
					if (firstToBeTwice) {
						console.log(`first to be twice found: ${firstToBeTwice}`);
						console.log(`total sum found: ${sum}`);
						console.log(`iterations used: ${iterations}`);
					} else {
						iterations++;
						console.log('Not found');
					}
					res(firstToBeTwice);
				});
			});
		};
		while (!firstToBeTwice) {
			await reading();
			console.log(`iterated: ${iterations}, current sums calculated: ${frequencyHistory.length}`);
		}
		console.log(`Answer found ${firstToBeTwice}`);
	});
}
(async function() {
	console.log(await read());
})(); // 55250
