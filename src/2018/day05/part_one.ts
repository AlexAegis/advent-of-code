import * as fs from 'fs';

/**
 * For the uncompressed solution check the previous commit
 *
 * @param sequence to be collapsed
 */
const collapse = (sequence: string) =>
	[...sequence].reduce((acc, curr) =>
		acc && acc.charAt(acc.length - 1) !== curr && acc.charAt(acc.length - 1).toLowerCase() === curr.toLowerCase()
			? acc.substr(0, acc.length - 1)
			: acc + curr
	);

export const runner = (async () => {
	let collapsedSequence = collapse(<string>(
		await fs.promises.readFile('src/2018/day05/input.txt', { encoding: 'UTF-8' })
	)); // Encoding is specified, result is string
	console.log(`Collapsed sequences length: ${collapsedSequence.length}`); // 9202
	return collapsedSequence.length;
})();
