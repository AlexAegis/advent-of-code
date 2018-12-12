import * as fs from 'fs';

/**
 * For the uncompressed solution check the previous commit
 *
 * @param sequence to be collapsed
 */
const collapse = (sequence: string): string =>
	[...sequence].reduce((acc, curr) =>
		acc.length > 0 &&
		acc.charAt(acc.length - 1) !== curr &&
		acc.charAt(acc.length - 1).toLowerCase() === curr.toLowerCase()
			? acc.substr(0, acc.length - 1)
			: acc + curr
	);

(async () => {
	let collapsedSequence: string = collapse(<string>(
		await fs.promises.readFile('src/2018/day5/input.txt', { encoding: 'UTF-8' })
	)); // Encoding is specified, result is string
	console.log(`Collapsed sequences length: ${collapsedSequence.length}`); // 9202
})();
