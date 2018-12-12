import * as fs from 'fs';

const react = (sequence: string): { sequence: string; occuredReactions: number } => {
	let current: string;
	let seq: string = '';
	let occ: number = 0;
	let reactLock: boolean = false;
	let index: number = 0;
	for (let next of sequence) {
		index++;
		//if (!reactLock) {
		if (current !== undefined && next !== current && next.toLowerCase() === current.toLowerCase()) {
			//console.log(`Occurence at index: ${index}, current: ${current},  next: ${next}`);
			occ++;
			reactLock = true;
		} else {
			seq = seq + (!reactLock && current ? current : '');
			reactLock = false;
		}
		current = next;
		//} else {
		//	reactLock = false;
		//	current = next;
		//}
		//console.log('iterated');
	}
	seq = seq + (current ? current : '');

	return { sequence: seq, occuredReactions: occ };
};

(async () => {
	let sequence: string = <string>await fs.promises.readFile('src/2018/day5/input.txt', { encoding: 'UTF-8' }); // Encoding is specified, result is string
	let reaction: { sequence: string; occuredReactions: number };
	do {
		reaction = react(sequence);
		sequence = reaction.sequence;
		console.log(reaction);
		console.log(`length after react: ${reaction.sequence.length}`);
	} while (reaction.occuredReactions > 0);
	console.log(`Remaining sequences length: ${reaction.sequence.length}`); // 7693 too low, 16933 not good, 21060 too high
})();
