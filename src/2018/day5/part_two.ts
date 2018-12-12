import * as fs from 'fs';

const react = (sequence: string): { sequence: string; occuredReactions: number } => {
	let prev: string;
	let seq: string = '';
	let occ: number = 0;
	for (let curr of sequence) {
		if (prev !== undefined && prev !== curr && prev.toLowerCase() === curr.toLowerCase()) {
			occ = occ + 1;
			seq = seq.substr(0, seq.length - 1);
			prev = seq.charAt(seq.length - 1);
		} else {
			seq = seq + curr;
			prev = curr;
		}
	}
	return { sequence: seq, occuredReactions: occ };
};

(async () => {
	let sequence: string = <string>await fs.promises.readFile('src/2018/day5/input.txt', { encoding: 'UTF-8' }); // Encoding is specified, result is string

	// get all unique letters regardless of casing
	const uniqueUnits = [...sequence].reduce((prev, curr) =>
		prev.includes(curr.toLowerCase()) ? prev.toLowerCase() : prev + curr.toLowerCase()
	);

	console.log(uniqueUnits);

	let shortestSequence: string;
	let shortestSequenceRemovedUnit: string;

	for (let unit of uniqueUnits) {
		let modifiedSequence = [...sequence].reduce((prev, curr) => (curr.toLowerCase() === unit ? prev : prev + curr));
		let reaction: { sequence: string; occuredReactions: number };
		do {
			reaction = react(modifiedSequence);
			modifiedSequence = reaction.sequence;
		} while (reaction.occuredReactions > 0); // Even thought it's designed for repeated reductions, the react function does everything in one go and collapses the entire sequence.
		console.log(
			`Remaining sequences length: ${reaction.sequence.length}, we used a sequence without the ${unit} unit.`
		);

		if (shortestSequence === undefined || reaction.sequence.length < shortestSequence.length) {
			shortestSequence = reaction.sequence;
			shortestSequenceRemovedUnit = unit;
		}
	}

	console.log(
		`Shortest sequence is ${shortestSequence.length} long. The removed unit is: ${shortestSequenceRemovedUnit}`
	); // 6394
})();
