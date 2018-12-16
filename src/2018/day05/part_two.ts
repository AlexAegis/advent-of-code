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
	console.time();
	let sequence = <string>await fs.promises.readFile('src/2018/day05/input.txt', { encoding: 'UTF-8' }); // Encoding is specified, result is string

	// get all unique letters regardless of casing
	const uniqueUnits = [...sequence].reduce((acc, curr) =>
		acc.includes(curr.toLowerCase()) ? acc.toLowerCase() : acc + curr.toLowerCase()
	);

	console.log(uniqueUnits);

	let shortestSequence: string;
	let shortestSequenceRemovedUnit: string;

	for (let unit of uniqueUnits) {
		let modifiedSequence = [...sequence].reduce((acc, curr) => (curr.toLowerCase() === unit ? acc : acc + curr));
		let collapsedSequence = collapse(modifiedSequence);
		console.log(
			`Remaining sequences length: ${collapsedSequence.length}, we used a sequence without the ${unit} unit.`
		);

		if (shortestSequence === undefined || collapsedSequence.length < shortestSequence.length) {
			shortestSequence = collapsedSequence;
			shortestSequenceRemovedUnit = unit;
		}
	}

	console.log(
		`Shortest sequence is ${shortestSequence.length} long. The removed unit is: ${shortestSequenceRemovedUnit}`
	); // 6394, with the removal of k and K
	return shortestSequence.length;
})();
